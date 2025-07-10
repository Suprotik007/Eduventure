import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import EventCard from './EventCard';


const EventSlider = ({ event }) => {
  return (
    

     <section className="max-w-xs md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-10 ">
     

      <Swiper
       spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000, 
          disableOnInteraction: false,
        }}
        // pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        
        slidesPerView={3}
        loop={true}
    
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
       {event.map((event, index) => (
        <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center' }}>
          <EventCard event={event} />
        </SwiperSlide>
      ))}
      </Swiper>
    </section>
  );
};

export default EventSlider;
