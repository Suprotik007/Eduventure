import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import BooksCard from './BooksCard';

const BooksSlider = ({ books }) => {
  return (
    

     <section className="max-w-xs md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-10 ">
     

      <Swiper
       spaceBetween={20}
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
          md: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
       {books.map((book, index) => (
        <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center' }}>
          <BooksCard book={book} />
        </SwiperSlide>
      ))}
      </Swiper>
    </section>
  );
};

export default BooksSlider;
