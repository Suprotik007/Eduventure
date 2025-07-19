import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/progress/feedbacks`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setFeedbacks(res.data);
         
          
        } else {
          setFeedbacks([]);
        }
      })
      .catch(err => {
        console.error(err);
        setFeedbacks([]);
      });
  }, []);

  return (
    <div className="my-10 px-4">
      <h2 className="text-3xl font-semibold mb-6 text-center">Student Feedback</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        {Array.isArray(feedbacks) && feedbacks.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-black shadow-md rounded-lg p-6 border-1 border-fuchsia-500 h-full">
              <img
  src={item.userImage}
  alt={item.student || 'User Photo'}
  className="rounded-full text-white w-16 h-16 mb-2 object-cover"
/>

              <h3 className="text-xl text-yellow-400 font-semibold mb-1">{item.student || "Anonymous"}</h3>
              <p className="text-teal-400 mb-2 italic">{item.email}</p>
              <p className="text-sm text-gray-300 mb-4">Class: <strong>{item.classTitle || 'Unknown'}</strong></p>

              <p className="text-gray-300">"{item.feedback}"</p>
              <div className="mt-2 text-white ">Rating : <span className='text-yellow-500'>★ {item.rating}</span></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Feedbacks;
