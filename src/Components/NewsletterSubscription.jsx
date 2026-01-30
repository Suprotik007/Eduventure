import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/subscribe`, {
        email,
        name: name || email.split('@')[0] // Use email prefix if name not provided
      });

      if (response.data.success) {
        setIsSuccess(true);
        toast.success(response.data.message);
        setEmail('');
        setName('');
        
        // Reset success state after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else if (response.data.alreadySubscribed) {
        toast.info(response.data.message);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error(error.response?.data?.error || 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-pink-100 to-orange-100 rounded-full blur-3xl opacity-20 translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Success State */}
          {isSuccess ? (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 shadow-lg">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Welcome Aboard! 🎉</h3>
              <p className="text-gray-600 mb-6">
                Thank you for subscribing! We've sent a welcome email to your inbox with all the details.
              </p>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-600 font-medium">Check your email</span>
              </div>
            </div>
          ) : (
            /* Subscription Form */
            <>
              {/* Header */}
              <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full mb-6 shadow-lg">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Stay Updated
                </span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                Never Miss an Update
              </h2>
              
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Subscribe to our newsletter and get the latest courses, expert tips, and exclusive resources delivered to your inbox.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100">
                  <div className="text-2xl font-bold text-blue-600">5k+</div>
                  <div className="text-sm text-gray-600">Subscribers</div>
                </div>
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100">
                  <div className="text-2xl font-bold text-purple-600">Weekly</div>
                  <div className="text-sm text-gray-600">Updates</div>
                </div>
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100">
                  <div className="text-2xl font-bold text-pink-600">0 Spam</div>
                  <div className="text-sm text-gray-600">Guaranteed</div>
                </div>
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100">
                  <div className="text-2xl font-bold text-emerald-600">Free</div>
                  <div className="text-sm text-gray-600">Forever</div>
                </div>
              </div>

              {/* Subscription Form */}
              <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name (Optional)
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    <div className="flex items-start space-x-2 mt-2">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to receive educational content, updates, and offers from EduVenture. I can unsubscribe anytime.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                        isSubmitting ? 'cursor-wait' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                          </svg>
                          <span>Subscribe to Newsletter</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Privacy Note */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center">
                      🔒 We respect your privacy. Your email is safe with us. No spam, ever.
                    </p>
                  </div>
                </div>
              </form>
            </>
          )}

          {/* Benefits Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Expert Insights</h4>
              <p className="text-sm text-gray-600">Get tips from industry experts and successful educators.</p>
            </div>
            
            <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-200 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Course Updates</h4>
              <p className="text-sm text-gray-600">Be first to know about new courses and special promotions.</p>
            </div>
            
            <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-teal-200 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Learning Resources</h4>
              <p className="text-sm text-gray-600">Access free resources, templates, and study materials.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;