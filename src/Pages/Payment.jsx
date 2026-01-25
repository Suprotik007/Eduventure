import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentCard from '../Elements/PaymentCard';

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

const Payment = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Header */}
            <div className="relative pt-24 pb-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-4">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-700">Secure Payment</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
                        Complete Your Enrollment
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Secure your spot with our encrypted payment system
                    </p>
                </div>
            </div>

            {/* Payment Content */}
            <div className="relative pb-20 px-4">
                <Elements stripe={stripePromise}>
                    <PaymentCard />
                </Elements>
            </div>

            {/* Security Assurance */}
            <div className="relative pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="card-modern p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                    </svg>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">256-bit Encryption</h3>
                                <p className="text-sm text-gray-600">Bank-level security for all transactions</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">PCI DSS Compliant</h3>
                                <p className="text-sm text-gray-600">Highest industry standards for payment processing</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">No Hidden Fees</h3>
                                <p className="text-sm text-gray-600">Transparent pricing with no surprises</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;