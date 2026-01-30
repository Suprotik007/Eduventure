import React, { useState } from 'react';
import { toast } from 'react-toastify';

const EventCard = ({ event, index = 0 }) => {
  const [remainingSeats, setRemainingSeats] = useState(event.seats || 50);
  const [hasRegistered, setHasRegistered] = useState(false);

  // Calculate percentage based on total seats (assuming 100 total seats)
  const totalSeats = 100;
  const seatsTaken = totalSeats - remainingSeats;
  const percentage = Math.min(Math.round((seatsTaken / totalSeats) * 100), 100);

  // Color gradients based on index for variety
  const gradients = [
    { 
      card: "from-blue-50/90 via-white to-cyan-50/90",
      border: "from-blue-200 via-blue-300 to-cyan-300",
      button: "from-blue-500 to-cyan-500",
      tag: "from-blue-100 to-cyan-100",
      text: "text-blue-700",
      icon: "text-blue-500"
    },
    { 
      card: "from-purple-50/90 via-white to-pink-50/90",
      border: "from-purple-200 via-purple-300 to-pink-300",
      button: "from-purple-500 to-pink-500",
      tag: "from-purple-100 to-pink-100",
      text: "text-purple-700",
      icon: "text-purple-500"
    },
    { 
      card: "from-emerald-50/90 via-white to-teal-50/90",
      border: "from-emerald-200 via-emerald-300 to-teal-300",
      button: "from-emerald-500 to-teal-500",
      tag: "from-emerald-100 to-teal-100",
      text: "text-emerald-700",
      icon: "text-emerald-500"
    },
    { 
      card: "from-amber-50/90 via-white to-orange-50/90",
      border: "from-amber-200 via-amber-300 to-orange-300",
      button: "from-amber-500 to-orange-500",
      tag: "from-amber-100 to-orange-100",
      text: "text-amber-700",
      icon: "text-amber-500"
    }
  ];

  // Set default index to 0 if not provided
  const gradientIndex = (index || 0) % gradients.length;
  const gradient = gradients[gradientIndex] || gradients[0];

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });
  const formattedTime = event.time || '7:00 PM';

  // Function to handle registration
  const handleRegister = () => {
    if (hasRegistered) {
      toast.info('You have already registered for this event!', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (remainingSeats <= 0) {
      toast.error('No seats available!', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setRemainingSeats(prev => prev - 1);
    setHasRegistered(true);
    
    toast.success('Successfully registered for the event!', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Function to handle sharing
  const handleShare = () => {
    // Create a shareable link (in a real app, this would be the actual event URL)
    const shareableLink = `${window.location.origin}/events/${event.id || 'event'}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        toast.success('Event link copied to clipboard!', {
          position: "top-right",
          autoClose: 2000,
        });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast.error('Failed to copy link', {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="relative group">
      {/* Glowing Border Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient.border} rounded-3xl blur opacity-40 group-hover:opacity-60 transition-all duration-700 -z-10`}></div>
      
      {/* Main Card */}
      <div className={`relative bg-gradient-to-br ${gradient.card} rounded-2xl border border-white/50 backdrop-blur-sm shadow-lg overflow-hidden group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}>
        
        {/* Decorative Corner Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/20 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
        
        {/* Event Image */}
        <div className="relative overflow-hidden h-48">
          {/* Image Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10"></div>
          
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Top Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className={`inline-block px-4 py-1.5 ${gradient.tag} ${gradient.text} backdrop-blur-sm rounded-full text-xs font-semibold shadow-sm`}>
              {event.type || 'Webinar'}
            </span>
          </div>
          
          {/* Date & Time Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/50 via-black/30 to-transparent">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span className="text-sm font-medium">{formattedDate}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="text-xs opacity-90">{formattedTime} EST</span>
                </div>
              </div>
              
              {/* Duration Badge */}
              <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                <span className="text-xs font-medium text-white">2h</span>
              </div>
            </div>
          </div>
          
          {/* Floating Calendar Animation */}
          <div className="absolute top-4 right-4 flex space-x-1 z-10">
            <div className="w-2 h-3 bg-white/40 rounded-sm transform rotate-12 group-hover:translate-y-1 transition-transform duration-500"></div>
            <div className="w-2 h-3 bg-white/50 rounded-sm transform -rotate-6 group-hover:-translate-y-1 transition-transform duration-500 delay-100"></div>
          </div>
        </div>

        {/* Event Info */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {event.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
            {event.description}
          </p>

          {/* Stats Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {/* Seats Available */}
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                  <svg className={`w-4 h-4 ${gradient.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Seats Available</div>
                  <div className="text-sm font-semibold text-gray-800">{remainingSeats}</div>
                </div>
              </div>
              
              {/* Price */}
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                  <svg className={`w-4 h-4 ${gradient.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Price</div>
                  <div className="text-sm font-semibold text-gray-800">${event.price || 'Free'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Seats Filling Fast</span>
              <span className="text-xs font-medium text-gray-700">{percentage}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${gradient.border} rounded-full transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Register Button */}
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${gradient.button} rounded-xl blur opacity-60 group-hover:opacity-80 transition-opacity duration-300`}></div>
            <button 
              onClick={handleRegister}
              disabled={hasRegistered || remainingSeats <= 0}
              className={`relative w-full px-6 py-3.5 bg-gradient-to-r ${gradient.button} text-white rounded-xl text-sm font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 group/btn disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0`}
            >
              {hasRegistered ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Registered ✓</span>
                </>
              ) : remainingSeats <= 0 ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Sold Out</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 transform group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                  </svg>
                  <span>Register Now</span>
                </>
              )}
              {!hasRegistered && remainingSeats > 0 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping opacity-75"></div>
              )}
            </button>
          </div>
          
          {/* Share Button */}
          <div className="flex justify-center mt-4">
            <button 
              onClick={handleShare}
              className="text-xs text-gray-500 hover:text-gray-700 flex items-center space-x-1 transition-colors duration-200 group/share"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
              </svg>
              <span className="group-hover/share:underline">Share Event</span>
            </button>
          </div>

          {/* Registration Status */}
          {hasRegistered && (
            <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-lg">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-green-700 font-medium">
                  You're registered! 
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;