import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import EventCard from './EventCard';

const EventSlider = ({ event }) => {
  if (!event || event.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Upcoming Events</h3>
        <p className="text-gray-600">New webinars will be announced soon!</p>
      </div>
    );
  }

  return (
    <div className="relative py-12">
      {/* Custom Styles */}
      <style>{`
        .events-slider .swiper-button-next,
        .events-slider .swiper-button-prev {
          color: #8B5CF6;
          background: white;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          top: 50%;
          transform: translateY(-50%);
        }
        .events-slider .swiper-button-next:after,
        .events-slider .swiper-button-prev:after {
          font-size: 20px;
          font-weight: bold;
        }
        .events-slider .swiper-button-next:hover,
        .events-slider .swiper-button-prev:hover {
          background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
          color: white;
        }
        .events-slider .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #DDD6FE;
          opacity: 1;
        }
        .events-slider .swiper-pagination-bullet-active {
          background: #8B5CF6;
          width: 24px;
          border-radius: 4px;
        }
        @media (max-width: 768px) {
          .events-slider .swiper-button-next,
          .events-slider .swiper-button-prev {
            display: none;
          }
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ 
          clickable: true,
          dynamicBullets: true 
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop={true}
        className="events-slider"
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30
          }
        }}
      >
        {event.map((eventItem, index) => (
          <SwiperSlide key={index}>
            <div className="px-2 py-4">
              <EventCard event={eventItem} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventSlider;