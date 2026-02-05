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
    <div className="relative w-11/12 mx-auto pt-20 md:pt-24 pb-8 md:pb-12">
      {/* Custom Styles */}
      <style>{`
        .banner-slider .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: white;
          opacity: 0.5;
        }
        .banner-slider .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 6px;
          background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
        }
        .banner-slider .swiper-button-next,
        .banner-slider .swiper-button-prev {
          color: white;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .banner-slider .swiper-button-next:after,
        .banner-slider .swiper-button-prev:after {
          font-size: 20px;
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
          .banner-slider .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
          }
          .banner-slider .swiper-pagination-bullet-active {
            width: 20px;
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
        className="banner-slider rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            {/* Responsive Height Container */}
            <div className="relative h-[60vh] min-h-[500px] sm:h-[55vh] sm:min-h-[450px] md:h-[75vh] lg:h-[85vh] md:min-h-[550px] lg:min-h-[600px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}></div>
              
              {/* Content Container */}
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 md:py-0">
                  <div className="max-w-4xl">
                    {/* Badge - Hidden on smallest screens */}
                    <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6 md:mb-8 animate-fade-in-up">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-xs sm:text-sm font-medium">New Courses Available</span>
                    </div>
                    
                    {/* Title - Responsive font sizes */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 animate-slide-in-left">
                      <span className={`bg-gradient-to-r ${slide.textGradient} bg-clip-text text-transparent`}>
                        {slide.title}
                      </span>
                    </h1>
                    
                    {/* Subtitle - Responsive font sizes */}
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white font-semibold mb-4 sm:mb-6 animate-slide-in-right">
                      {slide.subtitle}
                    </h2>
                    
                    {/* Description - Hidden on small screens, shown on medium+ */}
                    <p className="hidden sm:block text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl leading-relaxed animate-fade-in-up">
                      {slide.description}
                    </p>
                    
                    {/* CTA Buttons - Stack on small screens */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up">
                      <Link to="/allClass">
                        <button className={`px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${slide.buttonColor} text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center sm:justify-start`}>
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                          {slide.buttonText}
                        </button>
                      </Link>
                      <Link to="/becomeTutor">
                        <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center sm:justify-start">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                          </svg>
                          <span className="hidden sm:inline">Become an Instructor</span>
                          <span className="sm:hidden">Teach</span>
                        </button>
                      </Link>
                    </div>
                    
                    {/* Stats - Hidden on small screens, shown on medium+ */}
                    <div className="hidden md:flex mt-8 lg:mt-12 flex-wrap gap-4 lg:gap-6 animate-fade-in-up">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="text-xl lg:text-2xl font-bold text-white">50K+</div>
                          <div className="text-white/80 text-xs lg:text-sm">Active Learners</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="text-xl lg:text-2xl font-bold text-white">500+</div>
                          <div className="text-white/80 text-xs lg:text-sm">Expert Courses</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="text-xl lg:text-2xl font-bold text-white">98%</div>
                          <div className="text-white/80 text-xs lg:text-sm">Success Rate</div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Stats - Simple version */}
                    <div className="md:hidden mt-6 flex justify-center gap-4 animate-fade-in-up">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">50K+</div>
                        <div className="text-white/80 text-xs">Learners</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">500+</div>
                        <div className="text-white/80 text-xs">Courses</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">98%</div>
                        <div className="text-white/80 text-xs">Success</div>
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