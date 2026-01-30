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

  const getRandomGradient = (index) => {
    const gradients = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)"
    ];
    return gradients[index % gradients.length];
  };

  const getBorderGradient = (index) => {
    const borderGradients = [
      "from-blue-400 via-purple-500 to-pink-500",
      "from-pink-400 via-rose-500 to-orange-500",
      "from-cyan-400 via-blue-500 to-purple-500",
      "from-emerald-400 via-teal-500 to-cyan-500",
      "from-amber-400 via-orange-500 to-red-500",
      "from-violet-400 via-purple-500 to-fuchsia-500",
      "from-sky-400 via-blue-500 to-cyan-500",
      "from-lime-400 via-green-500 to-emerald-500"
    ];
    return borderGradients[index % borderGradients.length];
  };

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
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full w-72 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl blur-sm"></div>
                  <div className="relative h-[500px] bg-white rounded-2xl p-1">
                    <div className="h-56 bg-gray-200 rounded-t-xl"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-6"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!popular.length) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>
            <div className="relative w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8 border-8 border-white shadow-lg">
              <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">No Popular Classes Yet</h3>
          <p className="text-gray-600 text-lg">Be the first to enroll and start learning!</p>
          <Link to="/allClass" className="mt-6 inline-block">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              Browse All Classes
            </button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-blue-50/20 via-white to-purple-50/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-orange-200/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full mb-6 shadow-lg">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">🔥 Most Popular Courses</span>
          </div>
          <h2 className="text-2xl md:text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Top Trending Classes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our most sought-after courses 
          </p>
        </div>

        {/* Custom Arrow Styles */}
        <style>{`
          .slick-prev, .slick-next {
            width: 56px;
            height: 56px;
            z-index: 10;
            background: white !important;
            border-radius: 50%;
            box-shadow: 0 8px 32px rgba(102, 126, 234, 0.25);
            border: 2px solid transparent;
            display: flex !important;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }
          .slick-prev:hover, .slick-next:hover {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            transform: scale(1.1);
            border-color: white;
            box-shadow: 0 12px 40px rgba(102, 126, 234, 0.35);
          }
          .slick-prev:before, .slick-next:before {
            font-size: 24px;
            color: #4F46E5;
            font-weight: bold;
            opacity: 1;
          }
          .slick-prev:hover:before, .slick-next:hover:before {
            color: white;
          }
          .slick-prev {
            left: -70px;
          }
          .slick-next {
            right: -70px;
          }
          @media (max-width: 1024px) {
            .slick-prev, .slick-next {
              display: none !important;
            }
          }
          .slick-dots {
            bottom: -60px !important;
          }
          .slick-dots li {
            margin: 0 6px;
          }
          .slick-dots li button:before {
            font-size: 12px;
            color: #CBD5E1;
            opacity: 1;
          }
          .slick-dots li.slick-active button:before {
            color: #4F46E5;
            font-size: 14px;
          }
          .slick-dots li button {
            transition: all 0.3s ease;
          }
          .slick-dots li.slick-active button {
            transform: scale(1.2);
          }
        `}</style>

        <div className="relative">
          <Slider {...sliderSettings}>
            {popular.map((cls, index) => (
              <div key={cls._id} className="px-4 focus:outline-none group">
                {/* Gradient border wrapper */}
                <div className={`relative p-1 rounded-3xl bg-gradient-to-r border border-gray-400 shadow-xl group-hover:shadow-lg transition-all duration-500`}>
                  {/* Main card */}
                  <div className="relative bg-white rounded-2xl overflow-hidden h-full backdrop-blur-sm border border-white/50">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-50 to-orange-50 rounded-full translate-y-1/2 -translate-x-1/2 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-64">
                      <img
                        src={cls.image}
                        alt={cls.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm font-bold text-gray-800 shadow-lg">
                          ${cls.price}
                        </span>
                      </div>
                     
                    </div>

                    {/* Content */}
                    <div className="p-6 relative">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
                        {cls.title}
                      </h3>
                      
                      <div className="flex items-center mb-4">
                        <div className="relative">
                          <div className={`absolute inset-0 bg-gradient-to-r ${getBorderGradient(index)} rounded-full blur opacity-60`}></div>
                          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg">
                            <img
                              src={`https://ui-avatars.com/api/?name=${cls.teacherName}&background=4F46E5&color=fff`}
                              alt={cls.teacherName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-semibold text-gray-900">{cls.teacherName}</p>
                          <p className="text-xs text-gray-500 font-medium"> Instructor</p>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
                        {cls.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4">
                      
                          <div className="flex items-center space-x-2 text-gray-500">
                            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                              <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                              </svg>
                            </div>
                            <span className="text-sm font-medium">{cls.totalEnrolled || 0}</span>
                          </div>
                        </div>
                        
                        <Link to={`/classDtl/${cls._id}`}>
                          <button className={` px-6 py-2.5 bg-gradient-to-r ${getBorderGradient(index)} text-white rounded-xl text-sm font-semibold hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform flex items-center space-x-2`}>
                            <span>Enroll Now </span>
                            
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* View All Button */}
        <div className="text-center mt-24">
          <Link to="/allClass">
            <div className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-medium hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group border-2 border-white/50 shadow-lg">
              <span>Explore All Classes</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </div>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: popular.length, label: "Top Classes", gradient: "from-blue-400 to-cyan-400" },
            { value: "4.9⭐", label: "Avg Rating", gradient: "from-amber-400 to-orange-400" },
            { value: "12k+", label: "Enrollments", gradient: "from-emerald-400 to-teal-400" },
            { value: "24/7", label: "Support", gradient: "from-purple-400 to-pink-400" }
          ].map((stat, index) => (
            <div key={index} className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-20`}></div>
              <div className="relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg text-center">
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 mt-2 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopClasses;