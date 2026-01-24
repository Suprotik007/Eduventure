import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router';

const Banner = () => {
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Unlock Your Potential',
      subtitle: 'Discover interactive courses designed to boost your skills',
      description: 'Join thousands of learners transforming their careers with expert-led courses',
      gradient: 'from-yellow-900/70 via-yellow-800/60 to-indigo-900/70',
      textGradient: 'from-blue-300 via-cyan-300 to-teal-300',
      buttonColor: 'from-blue-600 to-cyan-600',
      buttonText: 'Explore Now'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Learn from Experts',
      subtitle: 'Access industry professionals with personalized guidance',
      description: 'Master in-demand skills with hands-on projects and real-world applications',
      gradient: 'from-purple-900/70 via-purple-800/60 to-pink-900/70',
      textGradient: 'from-purple-300 via-pink-300 to-rose-300',
      buttonColor: 'from-purple-600 to-pink-600',
      buttonText: 'Find Experts'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Join a Thriving Community',
      subtitle: 'Collaborate, share, and grow with learners worldwide',
      description: 'Your journey to knowledge starts with our supportive learning community',
      gradient: 'from-emerald-900/70 via-teal-800/60 to-cyan-900/70',
      textGradient: 'from-emerald-300 via-teal-300 to-cyan-300',
      buttonColor: 'from-emerald-600 to-teal-600',
      buttonText: 'View Classes'
    }
  ];

  return (
    <div className="relative w-11/12 mx-auto pt-24 pb-12">
      {/* Custom Styles */}
      <style>{`
        .banner-slider .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: white;
          opacity: 0.5;
        }
        .banner-slider .swiper-pagination-bullet-active {
          opacity: 1;
          width: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
        }
        .banner-slider .swiper-button-next,
        .banner-slider .swiper-button-prev {
          color: white;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .banner-slider .swiper-button-next:after,
        .banner-slider .swiper-button-prev:after {
          font-size: 24px;
          font-weight: bold;
        }
        .banner-slider .swiper-button-next:hover,
        .banner-slider .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }
        @media (max-width: 768px) {
          .banner-slider .swiper-button-next,
          .banner-slider .swiper-button-prev {
            display: none;
          }
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        speed={1000}
        className="banner-slider rounded-3xl shadow-2xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            {/* Background Image */}
            <div className="relative h-[85vh] min-h-[600px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}></div>
              
              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-4xl">
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8 animate-fade-in-up">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-sm font-medium">New Courses Available</span>
                    </div>
                    
                    {/* Title */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-slide-in-left">
                      <span className={`bg-gradient-to-r ${slide.textGradient} bg-clip-text text-transparent`}>
                        {slide.title}
                      </span>
                    </h1>
                    
                    {/* Subtitle */}
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-semibold mb-6 animate-slide-in-right">
                      {slide.subtitle}
                    </h2>
                    
                    {/* Description */}
                    <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed animate-fade-in-up">
                      {slide.description}
                    </p>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
                      <Link to="/allClass">
                        <button className={`px-8 py-4 bg-gradient-to-r ${slide.buttonColor} text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center`}>
                          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                          {slide.buttonText}
                        </button>
                      </Link>
                      <Link to="/becomeTutor">
                        <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center">
                          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                          </svg>
                          Become an Instructor
                        </button>
                      </Link>
                    </div>
                    
                    {/* Stats */}
                    <div className="mt-12 flex flex-wrap gap-6 animate-fade-in-up">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">50K+</div>
                          <div className="text-white/80 text-sm">Active Learners</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">500+</div>
                          <div className="text-white/80 text-sm">Expert Courses</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">98%</div>
                          <div className="text-white/80 text-sm">Success Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      
    </div>
  );
};

export default Banner;