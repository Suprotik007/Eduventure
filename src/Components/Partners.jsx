import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import partners from "../../src/assets/partners.json";

function PartnerCard({ logo, name, description, index }) {
  // Color gradients based on card index for variety
  const gradients = [
    "from-blue-400 to-cyan-300",
    "from-purple-400 to-pink-300",
    "from-emerald-400 to-teal-300",
    "from-amber-400 to-orange-300",
    "from-violet-400 to-fuchsia-300",
    "from-rose-400 to-pink-300",
    "from-sky-400 to-blue-300",
    "from-lime-400 to-green-300"
  ];
  
  const bgGradients = [
    "bg-gradient-to-br from-blue-50 to-cyan-50",
    "bg-gradient-to-br from-purple-50 to-pink-50",
    "bg-gradient-to-br from-emerald-50 to-teal-50",
    "bg-gradient-to-br from-amber-50 to-orange-50",
    "bg-gradient-to-br from-violet-50 to-fuchsia-50",
    "bg-gradient-to-br from-rose-50 to-pink-50",
    "bg-gradient-to-br from-sky-50 to-blue-50",
    "bg-gradient-to-br from-lime-50 to-green-50"
  ];
  
  const gradientIndex = index % gradients.length;
  const cardGradient = gradients[gradientIndex];
  const cardBg = bgGradients[gradientIndex];
  
  return (
    <div className={`relative p-6 rounded-2xl ${cardBg} border border-white shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer overflow-hidden`}>
      {/* Animated background effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${cardGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      {/* Floating particles */}
      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-r from-white to-transparent opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-gradient-to-r from-white to-transparent opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
      
      {/* Logo Container with gradient border */}
      <div className="relative mb-6">
        <div className={`absolute inset-0 bg-gradient-to-r ${cardGradient} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500`}></div>
        <div className="relative w-24 h-24 mx-auto rounded-2xl bg-white p-5 shadow-lg group-hover:scale-110 transition-transform duration-500">
          <img 
            src={logo} 
            alt={name} 
            className="w-full h-full object-contain filter group-hover:drop-shadow-lg transition-all duration-500" 
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Name with gradient text */}
        <h3 className={`text-xl font-bold bg-gradient-to-r ${cardGradient} bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform duration-300`}>
          {name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 group-hover:text-gray-800 transition-colors duration-300">
          {description}
        </p>
        
        {/* Partner Badge */}
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-r ${cardGradient} rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
          <div className="relative flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-white/80 backdrop-blur-sm">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${cardGradient}`}></div>
            <span className="text-sm font-semibold text-gray-700">Official Partner</span>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        
        {/* Hover effect line */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${cardGradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
      </div>
    </div>
  );
}

export default function PartnersSlider() {
  return (
    <div className="relative py-16 bg-gradient-to-b from-gray-50 to-white">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-pink-400/5"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-emerald-400/5 via-teal-400/5 to-cyan-400/5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Trusted</span> Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Collaborating with industry leaders to bring you the best educational experiences
          </p>
        </div>

        {/* Custom Styles */}
        <style>{`
          .partners-slider .swiper-button-next,
          .partners-slider .swiper-button-prev {
            color: #ffffff;
            background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
            width: 56px;
            height: 56px;
            border-radius: 50%;
            box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
            top: 50%;
            transform: translateY(-50%);
            transition: all 0.3s ease;
          }
          .partners-slider .swiper-button-next:after,
          .partners-slider .swiper-button-prev:after {
            font-size: 24px;
            font-weight: bold;
          }
          .partners-slider .swiper-button-next:hover,
          .partners-slider .swiper-button-prev:hover {
            background: linear-gradient(135deg, #1D4ED8 0%, #7C3AED 100%);
            transform: translateY(-50%) scale(1.1);
            box-shadow: 0 15px 30px rgba(59, 130, 246, 0.4);
          }
          .partners-slider .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: #E5E7EB;
            opacity: 1;
            transition: all 0.3s ease;
          }
          .partners-slider .swiper-pagination-bullet-active {
            background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
            width: 32px;
            border-radius: 6px;
            transform: scale(1.2);
          }
          .partners-slider .swiper-slide {
            padding: 20px 0;
          }
          .partners-slider .swiper-slide-active {
            transform: scale(1.05);
            transition: transform 0.3s ease;
          }
          @media (max-width: 768px) {
            .partners-slider .swiper-button-next,
            .partners-slider .swiper-button-prev {
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
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={true}
          className="partners-slider"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 40
            }
          }}
          speed={800}
        >
          {partners.map(({ id, logo, name, description }, index) => (
            <SwiperSlide key={id}>
              <div className="px-2 h-full flex">
                <PartnerCard 
                  logo={logo} 
                  name={name} 
                  description={description} 
                  index={index}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {partners.length}+
            </div>
            <div className="text-gray-600 mt-2">Partners</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              24/7
            </div>
            <div className="text-gray-600 mt-2">Support</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              100%
            </div>
            <div className="text-gray-600 mt-2">Satisfaction</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              ∞
            </div>
            <div className="text-gray-600 mt-2">Possibilities</div> 
          </div>
        </div>
      </div>
    </div>
  );
}