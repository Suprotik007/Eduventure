import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

const ClassDtlCard = () => {
  const { _id } = useParams(); 
  const [classDetail, setClassDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`https://a12-server-gamma.vercel.app/classes/${_id}`);
        const data = await response.json();
        setClassDetail(data);
      } catch (error) {
        console.error('Error fetching class details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (_id) {
      fetchClassDetails();
    }
  }, [_id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!classDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Class Not Found</h2>
          <p className="text-gray-600 mb-4">The class you're looking for doesn't exist or has been removed.</p>
          <Link to="/allClass" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Classes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50/30 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/allClass" className="inline-flex items-center text-gray-600 hover:text-gray-900 group">
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Classes
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="card-modern p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-sm font-medium mb-3">
                    {classDetail.category || 'Development'}
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{classDetail.title}</h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span className="font-medium text-gray-900">{classDetail.rating || '4.8'}</span>
                      <span className="text-gray-500 ml-1">({classDetail.reviews || 124} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span className="text-gray-600">12 hours total</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="rounded-2xl overflow-hidden mb-8">
                <img
                  src={classDetail.image}
                  alt={classDetail.title}
                  className="w-full h-80 object-cover"
                />
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-gray-200 mb-8">
                <nav className="flex space-x-8">
                  {['overview', 'curriculum', 'instructor', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`pb-4 px-1 font-medium text-sm relative ${
                        selectedTab === tab
                          ? 'text-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {selectedTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {selectedTab === 'overview' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">{classDetail.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
                        <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <div>
                          <h4 className="font-medium text-gray-900">Practical Projects</h4>
                          <p className="text-sm text-gray-600">Build real-world applications</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-xl">
                        <svg className="w-6 h-6 text-purple-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                        </svg>
                        <div>
                          <h4 className="font-medium text-gray-900">Lifetime Access</h4>
                          <p className="text-sm text-gray-600">Learn at your own pace</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'curriculum' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h3>
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors duration-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-gray-700 font-medium">{item}</span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">Module {item}: Getting Started</h4>
                                <p className="text-sm text-gray-600">5 lectures • 45 min</p>
                              </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTab === 'instructor' && (
                  <div>
                    <div className="flex items-center space-x-4 mb-6">
                      <img
                        src={classDetail.teacherPhoto || 'https://ui-avatars.com/api/?name=' + classDetail.teacherName}
                        alt={classDetail.teacherName}
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{classDetail.teacherName}</h4>
                        <p className="text-gray-600">Senior Instructor</p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      With over 10 years of experience in teaching and industry, {classDetail.teacherName} brings practical knowledge and real-world insights to every lesson.
                    </p>
                  </div>
                )}

                {selectedTab === 'reviews' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Student Reviews</h3>
                    <div className="space-y-4">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="p-6 border border-gray-200 rounded-xl">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <img
                                src={`https://i.pravatar.cc/40?img=${review}`}
                                alt="Student"
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <h4 className="font-medium text-gray-900">Alex Johnson</h4>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">2 weeks ago</span>
                          </div>
                          <p className="text-gray-700">"This course transformed my understanding of the subject. The practical examples were incredibly helpful!"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Enrollment Card */}
          <div className="lg:col-span-1">
            <div className="card-modern p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-gray-900">${classDetail.price}</span>
                  {classDetail.discount && (
                    <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-medium">
                      {classDetail.discount}% OFF
                    </span>
                  )}
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Lifetime access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Certificate of completion</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Access on mobile and TV</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Link to={`/payment/${classDetail._id}`}>
                  <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Enroll Now
                  </button>
                </Link>
                
                <button className="w-full py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300">
                  Add to Wishlist
                </button>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">This course includes:</p>
                  <div className="flex items-center justify-between text-sm text-gray-700">
                    <span>{classDetail.videos || 12} hours on-demand video</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-700 mt-1">
                    <span>{classDetail.totalEnrolled || 0} students enrolled</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Section */}
            <div className="card-modern p-6 mt-6">
              <h3 className="font-medium text-gray-900 mb-4">Share this course</h3>
              <div className="flex space-x-3">
                {['Facebook', 'Twitter', 'LinkedIn', 'Copy'].map((platform) => (
                  <button
                    key={platform}
                    className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-sm"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDtlCard;