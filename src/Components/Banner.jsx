
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';


import img1 from '../assets/edtech-1.jpg';
import img2 from '../assets/edtech-2.jpg';
import img3 from '../assets/edtech-3.jpg';
import { Link } from 'react-router';

const Banner = () => {
  return (
    <div className=" text-center justify-around p-3">
 <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000, 
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="rounded-box h-[70vh] max-h-[600px]" 
      >

        <SwiperSlide className="relative">
          <img
            src={img1}
            className="w-full h-full object-cover brightness-90 rounded-box"
            alt="Community gardening"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-4 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Unlock Your Potential</h2>
            <p className="text-xl mb-6 max-w-md">Discover interactive courses designed to boost your skills and accelerate your career—anytime, anywhere.</p>
         <Link to='/allClasses'><button className="btn btn-outline  btn-lg">Explore Now</button></Link>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="relative">
          <img
            src={img2}
            className="w-full h-full object-cover brightness-80 rounded-box"
            alt="Urban balcony garden"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-4 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Learn from Experts</h2>
            <p className="text-xl mb-6 max-w-md">Access top educators and industry professionals with personalized lessons tailored just for you.</p>
            <Link to='/allClasses'><button className="btn btn-outline btn-lg">Find more</button></Link>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide className="relative">
          <img
            src={img3}
            className="w-full h-full object-cover brightness-80 rounded-box"
            alt="Person planting seeds"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-4 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Join a Thriving Community</h2>
            <p className="text-xl mb-6 max-w-md">Collaborate, share, and grow with learners worldwide. Your journey to knowledge starts here!</p>
            <Link to='/allClasses'><button className="btn btn-outline btn-lg">View Classes</button></Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner; 