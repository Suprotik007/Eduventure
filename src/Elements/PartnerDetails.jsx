import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';



import partners from "../../src/assets/partners.json";

function PartnerCard({ logo, name, description }) {
  return (
    <div className=" bg-gray-100 border-1 rounded-lg shadow-lg p-5 flex flex-col items-center text-center">
      <img src={logo} alt={name} className="h-16 w-auto mb-4" />
      {/* <h3 className="text-lg font-semibold">{name}</h3> */}
      <p className=" font-medium mt-2 text-sm">{description}</p>
    </div>
  );
}

export default function PartnersSlider() {
  return (
    <section className="max-w-7xl mx-auto pxj-4 py-10 ">
     

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
        {partners.map(({ id, logo, name, description }) => (
          <SwiperSlide key={id}>
            <PartnerCard logo={logo} name={name} description={description} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
