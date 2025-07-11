import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

import PaymentCard from '../Elements/PaymentCard';

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key)



const Payment = () => {
    return (
       <Elements stripe={stripePromise}>
      <PaymentCard />
    </Elements>
    );
};

export default Payment;