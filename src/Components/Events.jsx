import React, { useEffect, useState } from 'react';
import EventSlider from '../Elements/EventSlider';
import { toast } from 'react-toastify';
import axios from 'axios';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('upcoming');
    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);

    useEffect(() => {
        fetch('/events.json')
            .then(res => res.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    const filteredEvents = filter === 'upcoming' 
        ? events.slice(0, 6) 
        : events.slice(0, 3); 

    const handleSubscribe = async (e) => {
        e.preventDefault();
        
        if (!email || !email.includes('@')) {
            toast.error('Please enter a valid email address');
            return;
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setIsSubscribing(true);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await axios.post(`${API_URL}/api/subscribe`, {
                email: email.toLowerCase().trim(),
                name: email.split('@')[0] 
            });

            if (response.data.success) {
                toast.success('Subscribed successfully! Check your email for welcome message.');
                setEmail('');
                
                // Show additional info for development mode
                if (import.meta.env.MODE === 'development') {
                    toast.info('In development mode, emails are logged in console.');
                }
            } else if (response.data.alreadySubscribed) {
                toast.info('You are already subscribed to our newsletter!');
            }
        } catch (error) {
            console.error('Subscription error:', error);
            toast.error(error.response?.data?.error || 'Failed to subscribe. Please try again.');
        } finally {
            setIsSubscribing(false);
        }
    };

    if (loading) {
        return (
            <section className="px-4 bg-gradient-to-br from-purple-50 via-white to-pink-50">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-10 bg-gray-200 rounded-lg w-96 mx-auto mb-12"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-96 bg-gray-200 rounded-2xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-5 px-4 bg-gradient-to-br from-purple-50 via-white to-pink-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-purple-700">Live Learning</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-6">
                        Interactive Webinars & Events
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Join live sessions with industry experts and expand your knowledge 
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-white rounded-2xl p-1 border border-gray-200">
                        <button
                            onClick={() => setFilter('upcoming')}
                            className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                                filter === 'upcoming'
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Upcoming Events
                        </button>
                        <button
                            onClick={() => setFilter('past')}
                            className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                                filter === 'past'
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Past Events
                        </button>
                    </div>
                </div>

                {/* Events Content */}
                {filteredEvents.length > 0 ? (
                    <>
                        <EventSlider event={filteredEvents} />
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Scheduled</h3>
                        <p className="text-gray-600">New events will be announced soon. Check back later!</p>
                    </div>
                )}

                {/* Call to Action - Subscribe Section */}
                <div className="mt-16 text-center">
                    <div className="inline-block p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-2xl animate-float">
                        <div className="bg-white rounded-xl px-6 py-8 md:px-8 md:py-6">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Stay Updated with Events</h3>
                            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                Subscribe to our newsletter and never miss an important webinar or workshop
                            </p>
                            
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                                />
                                <button 
                                    type="submit"
                                    disabled={isSubscribing}
                                    className={`px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                                        isSubscribing 
                                            ? 'opacity-70 cursor-not-allowed' 
                                            : 'hover:opacity-90 hover:shadow-lg'
                                    }`}
                                >
                                    {isSubscribing ? (
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
                                            <span>Subscribe</span>
                                        </>
                                    )}
                                </button>
                            </form>
                            
                            {/* Privacy Note */}
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <p className="text-xs text-gray-500 text-center">
                                    🔒 We respect your privacy. Your email is safe with us. No spam, ever.
                                </p>
                            </div>
                            
            
                        </div>
                    </div>
                </div>

               
                </div>
            
        </section>
    );
};

export default Events;