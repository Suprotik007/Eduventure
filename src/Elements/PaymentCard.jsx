import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Providers/useAxiosSecure';
import useAuth from '../Providers/useAuth';

const PaymentCard = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { classId } = useParams(); // renamed from parcelId
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const { isPending, data: classInfo = {} } = useQuery({
    queryKey: ['class', classId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${classId}`);
      return res.data;
    }
  });

  if (isPending) {
    return <p>Loading class info...</p>;
  }

  const amount = classInfo?.price;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (methodError) {
      setError(methodError.message);
      return;
    }

    // Step 2: Create payment intent
    const res = await axiosSecure.post('/create-payment-intent', {
      amountInCents,
      classId,
    });

    const clientSecret = res.data.clientSecret;

    // Step 3: Confirm card payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user.displayName || 'Student',
          email: user.email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      setError('');
      if (result.paymentIntent.status === 'succeeded') {
        const transactionId = result.paymentIntent.id;

        // Step 4: Store payment & enrollment info
        const paymentData = {
          classId,
          classTitle: classInfo.title,
          email: user.email,
          amount,
          transactionId,
          paymentMethod: result.paymentIntent.payment_method_types,
          date: new Date(),
        };

        const paymentRes = await axiosSecure.post('/payments', paymentData);
        if (paymentRes.data.insertedId) {
          await Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
            confirmButtonText: 'Go to My Classes',
          });

          navigate('/dashboard/my-enroll-class');
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      
    
    >
        <h1 className='text-xl font-semibold'>Enroll in :{classInfo.title} </h1>
      <CardElement className="p-2 border rounded" />
      <button
        type="submit"
        className="btn btn-neutral text-white w-full"
        disabled={!stripe}
      >
        Pay ${amount}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default PaymentCard;
