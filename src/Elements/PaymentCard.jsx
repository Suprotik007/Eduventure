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
  const { classId } = useParams(); 
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const { isPending, data: classInfo = {} } = useQuery({
    queryKey: ['class', classId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${classId}`);
      return res.data;
    }
  });

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const amount = classInfo?.price || 0;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError('');

    try {
      const card = elements.getElement(CardElement);
      if (!card) {
        setError('Card element not found');
        return;
      }

      const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (methodError) {
        setError(methodError.message);
        setProcessing(false);
        return;
      }

      const res = await axiosSecure.post('/api/create-payment-intent', {
        amountInCents,
        classId,
      });

      const clientSecret = res.data.clientSecret;

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
        if (result.paymentIntent.status === 'succeeded') {
          const transactionId = result.paymentIntent.id;
          
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
              html: `
                <div class="text-center">
                  <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Enrollment Confirmed!</h3>
                  <p class="text-gray-600 mb-4">You now have access to "${classInfo.title}"</p>
                  <div class="bg-gray-100 p-4 rounded-lg mb-4">
                    <p class="text-sm text-gray-700 mb-1"><strong>Transaction ID:</strong></p>
                    <code class="text-sm bg-white p-2 rounded block">${transactionId}</code>
                  </div>
                </div>
              `,
              confirmButtonText: 'Go to My Classes',
              confirmButtonColor: '#4F46E5',
              showCancelButton: true,
              cancelButtonText: 'Continue Browsing',
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/dashboard/my-enroll-class');
              } else {
                navigate('/allClass');
              }
            });
          }
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <span className="text-sm text-gray-600 mt-2">Select</span>
            </div>
            <div className="w-24 h-1 bg-blue-600 mx-4"></div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <span className="text-sm text-gray-600 mt-2">Review</span>
            </div>
            <div className="w-24 h-1 bg-blue-600 mx-4"></div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <span className="text-sm font-medium text-gray-900 mt-2">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-2">
            <div className="card-modern p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Complete Your Enrollment</h2>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  <span className="text-sm text-gray-600">Secure Payment</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Select Payment Method</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {['card', 'paypal', 'google', 'apple'].map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                        paymentMethod === method
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                          paymentMethod === method
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {paymentMethod === method && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="font-medium capitalize">{method}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Card Information</h3>
                  <div className="p-6 border border-gray-300 rounded-xl bg-white">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#374151',
                            '::placeholder': {
                              color: '#9CA3AF',
                            },
                            iconColor: '#4F46E5',
                          },
                          invalid: {
                            color: '#EF4444',
                          },
                        },
                        hidePostalCode: true,
                      }}
                      className="p-4 border border-gray-300 rounded-lg"
                    />
                  </div>
                  {error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Billing Address */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={user?.displayName?.split(' ')[0]}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={user?.displayName?.split(' ')[1]}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={user?.email}
                      readOnly
                    />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!stripe || processing}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  {processing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Payment...
                    </>
                  ) : (
                    `Pay $${amount} & Enroll Now`
                  )}
                </button>
              </form>
            </div>

            {/* Security Info */}
            <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Your payment is secure</h4>
                  <p className="text-sm text-gray-600">
                    We use 256-bit SSL encryption and comply with PCI-DSS standards. Your payment information is never stored on our servers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-modern p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              {/* Course Info */}
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={classInfo.image}
                  alt={classInfo.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900 line-clamp-2">{classInfo.title}</h4>
                  <p className="text-sm text-gray-600">by {classInfo.teacherName}</p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Course Price</span>
                  <span className="font-medium">${amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      ${amount}
                    </span>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">What's included:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Full lifetime access
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Certificate of completion
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    24/7 support access
                  </li>
                </ul>
              </div>

              {/* Refund Policy */}
              <div className="mt-6 p-4 bg-amber-50 rounded-xl">
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-amber-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="text-sm text-amber-700">
                    30-day money-back guarantee. No questions asked.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;