import React, { useEffect, useState } from 'react';
import EventSlider from '../Elements/EventSlider';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('upcoming');

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
        ? events.slice(0, 6) // First 6 events
        : events.slice(0, 3); // First 3 for past

    if (loading) {
        return (
            <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
        <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-white to-pink-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-purple-700">Live Learning</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-6">
                        Interactive Webinars & Events
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Join live sessions with industry experts and expand your knowledge in real-time
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
                        
                        {/* Stats Bar */}
                        <div className="mt-16">
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                    <div>
                                        <div className="text-3xl font-bold text-gray-900 mb-2">{events.length}</div>
                                        <div className="text-sm text-gray-600">Total Events</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
                                        <div className="text-sm text-gray-600">Satisfaction Rate</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-gray-900 mb-2">5K+</div>
                                        <div className="text-sm text-gray-600">Participants</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                                        <div className="text-sm text-gray-600">Expert Speakers</div>
                                    </div>
                                </div>
                            </div>
                        </div>
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

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <div className="inline-block p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-2xl animate-float">
                        <div className="bg-white rounded-xl px-8 py-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Stay Updated with Events</h3>
                            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                Subscribe to our newsletter and never miss an important webinar or workshop
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                                <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-300">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Events;