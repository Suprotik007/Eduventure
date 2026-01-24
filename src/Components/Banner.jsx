
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
    <div className="text-center justify-around p-3 animate-fade-in-up">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="rounded-3xl h-[75vh] shadow-2xl overflow-hidden"
      >
        <SwiperSlide className="relative group">
          <img
            src={img1}
            className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-700 rounded-3xl"
            alt="Unlock Your Potential - Interactive Learning"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-blue-900/60 to-indigo-900/70 flex flex-col items-center justify-center text-white p-4 text-center rounded-3xl">
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl max-w-4xl">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent animate-slide-in-left">
                Unlock Your Potential
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-2xl leading-relaxed animate-slide-in-right">
                Discover interactive courses designed to boost your skills and accelerate your career—anytime, anywhere.
              </p>
              <Link to='/allClass'>
                <button className="btn btn-primary btn-lg px-8 py-4 text-lg font-semibold rounded-full hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl animate-fade-in-up">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  Explore Now
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="relative group">
          <img
            src={img2}
            className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-700 rounded-3xl"
            alt="Learn from Expert Educators"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-teal-900/60 to-cyan-900/70 flex flex-col items-center justify-center text-white p-4 text-center rounded-3xl">
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl max-w-4xl">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 bg-clip-text text-transparent animate-slide-in-left">
                Learn from Experts
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-2xl leading-relaxed animate-slide-in-right">
                Access top educators and industry professionals with personalized lessons tailored just for you.
              </p>
              <Link to='/allClass'>
                <button className="btn btn-secondary btn-lg px-8 py-4 text-lg font-semibold rounded-full hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl animate-fade-in-up">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  Find Experts
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="relative group">
          <img
            src={img3}
            className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-700 rounded-3xl"
            alt="Join a Thriving Learning Community"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900/70 via-purple-900/60 to-indigo-900/70 flex flex-col items-center justify-center text-white p-4 text-center rounded-3xl">
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl max-w-4xl">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent animate-slide-in-left">
                Join a Thriving Community
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-2xl leading-relaxed animate-slide-in-right">
                Collaborate, share, and grow with learners worldwide. Your journey to knowledge starts here!
              </p>
              <Link to='/allClass'>
                <button className="btn btn-primary btn-lg px-8 py-4 text-lg font-semibold rounded-full hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl animate-fade-in-up">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  View Classes
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner; 