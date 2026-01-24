import React from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

const TopClasses = () => {
  const { data: popular = [], isLoading } = useQuery({
    queryKey: ["popular-classes"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/classes/popular`);
      return res.data;
    }
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: Math.min(3, popular.length),
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 3500,
    arrows: true,
    pauseOnHover: true,
    responsive: [
      { 
        breakpoint: 1280, 
        settings: { 
          slidesToShow: Math.min(3, popular.length),
          arrows: true 
        } 
      },
      { 
        breakpoint: 1024, 
        settings: { 
          slidesToShow: 2,
          arrows: false 
        } 
      },
      { 
        breakpoint: 768, 
        settings: { 
          slidesToShow: 1,
          arrows: false 
        } 
      },
      { 
        breakpoint: 640, 
        settings: { 
          slidesToShow: 1,
          arrows: false,
          dots: false 
        } 
      }
    ]
  };

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!popular.length) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Popular Classes Yet</h3>
          <p className="text-gray-600">Be the first to enroll and start learning!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-700">Most Popular</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Trending Classes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of learners in our most sought-after courses
          </p>
        </div>

        {/* Custom Arrow Styles */}
        <style>{`
          .slick-prev, .slick-next {
            width: 48px;
            height: 48px;
            z-index: 10;
            background: white !important;
            border-radius: 50%;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
          .slick-prev:hover, .slick-next:hover {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          }
          .slick-prev:before, .slick-next:before {
            font-size: 20px;
            color: #4F46E5;
          }
          .slick-prev:hover:before, .slick-next:hover:before {
            color: white;
          }
          .slick-prev {
            left: -60px;
          }
          .slick-next {
            right: -60px;
          }
          @media (max-width: 1024px) {
            .slick-prev, .slick-next {
              display: none !important;
            }
          }
          .slick-dots li button:before {
            font-size: 10px;
            color: #CBD5E1;
          }
          .slick-dots li.slick-active button:before {
            color: #4F46E5;
          }
        `}</style>

        <div className="relative">
          <Slider {...sliderSettings}>
            {popular.map(cls => (
              <div key={cls._id} className="px-3 focus:outline-none">
                <div className="card-modern overflow-hidden h-full hover:-translate-y-2 transition-all duration-500">
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={cls.image}
                      alt={cls.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-800">
                        ${cls.price}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs font-semibold">
                          {cls.category || 'Development'}
                        </span>
                        <div className="flex items-center text-white text-sm">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          {cls.rating || '4.8'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">
                      {cls.title}
                    </h3>
                    
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                        <img
                          src={`https://ui-avatars.com/api/?name=${cls.teacherName}&background=4F46E5&color=fff`}
                          alt={cls.teacherName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{cls.teacherName}</p>
                        <p className="text-xs text-gray-500">Instructor</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 line-clamp-2">
                      {cls.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <span className="text-sm text-gray-600">12h</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                          </svg>
                          <span className="text-sm text-gray-600">{cls.totalEnrolled || 0}</span>
                        </div>
                      </div>
                      
                      <Link to={`/classDtl/${cls._id}`}>
                        <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl">
                          Enroll Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/allClass">
            <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 inline-flex items-center">
              View All Classes
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopClasses;