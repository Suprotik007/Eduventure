import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

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
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!feedbacks.length) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Feedback Yet</h3>
          <p className="text-gray-600">Be the first to share your learning experience!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full mb-4">
            <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-yellow-700">Testimonials</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-pink-600 bg-clip-text text-transparent mb-6">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from learners who transformed their careers
          </p>
        </div>

        {/* Feedback Slider */}
        <div className="relative">
          <style>{`
            .swiper-button-next, .swiper-button-prev {
              color: #4F46E5;
              background: white;
              width: 48px;
              height: 48px;
              border-radius: 50%;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
            .swiper-button-next:after, .swiper-button-prev:after {
              font-size: 20px;
            }
            .swiper-button-next:hover, .swiper-button-prev:hover {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            @media (max-width: 768px) {
              .swiper-button-next, .swiper-button-prev {
                display: none;
              }
            }
          `}</style>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {feedbacks.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="h-full">
                  <div className="card-modern p-8 h-full hover:shadow-2xl transition-all duration-500">
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <svg className="w-12 h-12 text-blue-100" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-2.2 1.8-4 4-4zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-8c0-2.2 1.8-4 4-4z"/>
                      </svg>
                    </div>

                    {/* Feedback Text */}
                    <p className="text-gray-700 text-lg italic mb-8 leading-relaxed">
                      "{item.feedback}"
                    </p>

                    {/* Student Info */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={item.userImage || `https://ui-avatars.com/api/?name=${item.student}&background=4F46E5&color=fff`}
                          alt={item.student}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg"
                        />
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{item.student || "Anonymous"}</h4>
                        <p className="text-sm text-gray-600">{item.email}</p>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">{item.rating}/5</span>
                        </div>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                        </svg>
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {item.classTitle || 'Unknown Course'}
                        </span>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-6 right-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Stats Bar */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{feedbacks.length}</div>
                <div className="text-sm text-gray-600">Total Reviews</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {feedbacks.length > 0 
                    ? (feedbacks.reduce((sum, f) => sum + (f.rating || 0), 0) / feedbacks.length).toFixed(1)
                    : '0.0'}
                </div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedbacks;