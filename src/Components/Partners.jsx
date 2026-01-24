import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import partners from "../../src/assets/partners.json";

function PartnerCard({ logo, name, description }) {
  return (
    <div className="card-modern p-6 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-500 group">
      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 mb-6 group-hover:scale-110 transition-transform duration-500">
        <img src={logo} alt={name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{name}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      <div className="mt-6 pt-6 border-t border-gray-100 w-full">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          <span>Official Partner</span>
        </div>
      </div>
    </div>
  );
}

export default function PartnersSlider() {
  return (
    <div className="relative py-12">
      {/* Custom Styles */}
      <style>{`
        .partners-slider .swiper-button-next,
        .partners-slider .swiper-button-prev {
          color: #3B82F6;
          background: white;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          top: 50%;
          transform: translateY(-50%);
        }
        .partners-slider .swiper-button-next:after,
        .partners-slider .swiper-button-prev:after {
          font-size: 20px;
          font-weight: bold;
        }
        .partners-slider .swiper-button-next:hover,
        .partners-slider .swiper-button-prev:hover {
          background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
          color: white;
        }
        .partners-slider .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #DBEAFE;
          opacity: 1;
        }
        .partners-slider .swiper-pagination-bullet-active {
          background: #3B82F6;
          width: 24px;
          border-radius: 4px;
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
          delay: 3000,
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
          1024: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 40
          }
        }}
      >
        {partners.map(({ id, logo, name, description }) => (
          <SwiperSlide key={id}>
            <div className="px-2 py-4">
              <PartnerCard logo={logo} name={name} description={description} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}