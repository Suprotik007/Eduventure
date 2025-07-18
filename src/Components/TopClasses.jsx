
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
    responsive: [   
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 600,  settings: { slidesToShow: 1 } }
    ]
  };

  if (isLoading) return <div>Loading popular classes...</div>;

  if (!popular.length) return <div>No popular classes found.</div>;

  return (
    <section className="">
      <h2 className="text-3xl font-semibold mb-5 text-center "> Popular Classes</h2>
      <Slider {...sliderSettings}>
        {popular.map(cls => (
          <div key={cls._id} className="px-4 py-3">
            <div className="bg-black h-100 shadow rounded-xl px-4 py-6 flex flex-col items-center">
              {cls.image &&  (
                <img src={cls.image} alt={cls.title} className=" h-28 object-cover rounded-lg mb-3" />
              )}
              <h4 className="font-semibold text-yellow-400 text-lg mb-1 text-center">{cls.title}</h4>
              <div className="text-white text-sm text-center mb-1">by {cls.teacherName}</div>
              <div className="font-bold text-fuchsia-400 mb-2">Enrolled: {cls.totalEnrolled || 0}</div>
              <p className="text-gray-100 mb-3 text-center">{cls.description?.slice(0, 80)}...</p>
           <Link to={`/classDtl/${cls._id}`}>
           
              <button className="btn btn-primary btn-sm">More</button></Link>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default TopClasses;
