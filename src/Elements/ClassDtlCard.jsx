import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { toast } from 'react-toastify';

const ClassDtlCard = () => {
  const { _id } = useParams(); 
  const [classDetail, setClassDetail] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        
        const classResponse = await fetch(`https://a12-server-gamma.vercel.app/classes/${_id}`);
        const classData = await classResponse.json();
        setClassDetail(classData);

        setLoadingFeedbacks(true);
        const feedbackResponse = await fetch(`https://a12-server-gamma.vercel.app/progress/feedbacks/${_id}`);
        if (feedbackResponse.ok) {
          const allFeedbacks = await feedbackResponse.json();

          
          const classFeedbacks = allFeedbacks.filter(feedback => 
            feedback.classId === _id || 
            feedback.classTitle === classData.title
          );
          setFeedbacks(classFeedbacks);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load class details');
      } finally {
        setLoading(false);
        setLoadingFeedbacks(false);
      }
    };
    
    if (_id) {
      fetchClassDetails();
    }
  }, [_id]);

  // Calculate dynamic values
  const calculateEnrollmentStatus = (enrolled) => {
    if (enrolled >= 6) return { text: 'Very Popular', color: 'from-red-500 to-orange-500', badge: '🔥 Hot' };
    if (enrolled >= 4) return { text: 'Growing Fast', color: 'from-green-500 to-emerald-500', badge: '📈 Trending' };
    if (enrolled >= 3) return { text: 'Popular', color: 'from-blue-500 to-cyan-500', badge: '⭐ Popular' };
    return { text: 'New Course', color: 'from-purple-500 to-pink-500', badge: '🆕 New' };
  };

  const calculateRatingStats = () => {
    if (feedbacks.length === 0) return { average: 4.5, count: 0 };
    const total = feedbacks.reduce((sum, fb) => sum + (fb.rating || 0), 0);
    return { average: (total / feedbacks.length).toFixed(1), count: feedbacks.length };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!classDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-orange-200 rounded-full blur-xl opacity-30"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Class Not Found</h2>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/allClass" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to All Courses
          </Link>
        </div>
      </div>
    );
  }

  const enrollmentStatus = calculateEnrollmentStatus(classDetail.totalEnrolled || 0);
  const ratingStats = calculateRatingStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            to="/allClass" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 group transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center mr-3 group-hover:-translate-x-1 transition-transform duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </div>
            <span className="font-medium">Back to Courses</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-8 mb-8 overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              
              <div className="relative">
               
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  {classDetail.title}
                </h1>
                
                <div className="flex flex-wrap flex-row items-center gap-6 mt-4"> 
                  <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-100">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(ratingStats.average) ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="font-bold text-gray-900">{ratingStats.average}</span>
                    <span className="text-gray-500 ml-2">({ratingStats.count} reviews)</span>
                  </div>
                  
                  <div className="flex items-center ">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{classDetail.totalEnrolled || 0} enrolled</div>
                      <div className="text-xs text-gray-500">{enrollmentStatus.text}</div>
                    </div>

                    <div className='ml-9'>
                      
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-xl text-sm font-semibold">
                    {enrollmentStatus.badge}
                  </span>
                    </div>
                 
                
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative rounded-3xl overflow-hidden mb-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
              <img
                src={classDetail.image}
                alt={classDetail.title}
                className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Tab Navigation */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg p-6 mb-8">
              <div className="flex space-x-1 bg-gray-100/50 p-1 rounded-xl">
                {['overview', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
                      selectedTab === tab
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-white/50'
                    }`}
                  >
                    {tab === 'overview' ? 'Course Overview' : 'Student Reviews'}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mt-8">
                {selectedTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        What You'll Learn
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {classDetail.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative p-5 bg-gradient-to-br from-blue-50/80 to-white rounded-2xl border border-blue-100 group hover:shadow-lg transition-all duration-300">
                        <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">Hands-on Learning</h4>
                        <p className="text-gray-600 text-sm">Practical projects and real-world applications</p>
                      </div>
                      
                      <div className="relative p-5 bg-gradient-to-br from-purple-50/80 to-white rounded-2xl border border-purple-100 group hover:shadow-lg transition-all duration-300">
                        <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                          </svg>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">Lifetime Access</h4>
                        <p className="text-gray-600 text-sm">Learn at your own pace, anytime, anywhere</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'reviews' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Student Feedback
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-3xl font-bold text-gray-900">{ratingStats.average}</span>
                        <div className="text-left">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(ratingStats.average) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{ratingStats.count} reviews</span>
                        </div>
                      </div>
                    </div>

                    {loadingFeedbacks ? (
                      <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading feedback...</p>
                      </div>
                    ) : feedbacks.length === 0 ? (
                      <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                          </svg>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">No Reviews Yet</h4>
                        <p className="text-gray-600">Be the first to share your experience with this course!</p>
                      </div>
                    ) : (
                      <div className="space-y-4  rounded-2xl p-6 backdrop-blur-sm">
                        {feedbacks.map((feedback) => (
                          <div 
                            key={feedback._id} 
                            className="relative font-semibold bg-gradient-to-br from-purple-100  via-violet-100 to-pink-200 rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className="relative">
                                  <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur opacity-30"></div>
                                  <img
                                    src={feedback.userImage || `https://ui-avatars.com/api/?name=${feedback.student}&background=4F46E5&color=fff`}
                                    alt={feedback.student}
                                    className="relative w-12 h-12 rounded-full border-2 border-white"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-900">{feedback.student || 'Anonymous'}</h4>
                                  <div className="flex items-center mt-1">
                                    {[...Array(5)].map((_, i) => (
                                      <svg 
                                        key={i} 
                                        className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                        fill="currentColor" 
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                      </svg>
                                    ))}
                                    <span className="ml-2 text-sm font-medium text-gray-700">{feedback.rating}/5</span>
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs text-gray-500">
                              {feedback.email}
                              </span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">"{feedback.feedback}"</p>
                            
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                                </svg>
                                <span className="text-sm text-gray-600">
                                  Course: {feedback.classTitle || classDetail.title}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Enrollment Card */}
          <div className="lg:col-span-1">
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-2xl p-6 sticky top-24 overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
              
              <div className="relative">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      ${classDetail.price}
                    </span>
                    {classDetail.discount && (
                      <span className="px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-semibold shadow-lg">
                        {classDetail.discount}% OFF
                      </span>
                    )}
                  </div>
                  
                  {/* Enrollment Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Course Progress</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {Math.min(Math.round(((classDetail.totalEnrolled || 0) / 100) * 100), 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${enrollmentStatus.color} rounded-full transition-all duration-700`}
                        style={{ width: `${Math.min(((classDetail.totalEnrolled || 0) / 100) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 text-center">
                      {classDetail.totalEnrolled || 0} students enrolled
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link to={`/payment/${classDetail._id}`}>
                    <button className="relative w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 group">
                      <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                      <span>Enroll Now</span>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping opacity-75"></div>
                    </button>
                  </Link>
                  
                  {/* Instructor Info */}
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                      Instructor
                    </h4>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur opacity-30"></div>
                        <img
                          src={classDetail.teacherPhoto || `https://ui-avatars.com/api/?name=${classDetail.teacherName}&background=4F46E5&color=fff&bold=true`}
                          alt={classDetail.teacherName}
                          className="relative w-12 h-12 rounded-full border-2 border-white"
                        />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">{classDetail.teacherName}</h5>
                        <p className="text-sm text-gray-600">Senior Instructor</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Stats Card */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-6 mt-6 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-200/20 to-teal-200/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                Course Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 rounded-xl">
                  <span className="text-sm text-gray-600">Current Students</span>
                  <span className="font-semibold text-gray-900">{classDetail.totalEnrolled || 0}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-xl">
                  <span className="text-sm text-gray-600">Average Rating</span>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-900 mr-2">{ratingStats.average}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-3 h-3 ${i < Math.floor(ratingStats.average) ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-xl">
                  <span className="text-sm text-gray-600">Feedback Count</span>
                  <span className="font-semibold text-gray-900">{ratingStats.count}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50/50 to-orange-50/50 rounded-xl">
                  <span className="text-sm text-gray-600">Popularity</span>
                  <span className={`font-semibold ${
                    enrollmentStatus.text === 'Very Popular' ? 'text-red-600' :
                    enrollmentStatus.text === 'Growing Fast' ? 'text-green-600' :
                    enrollmentStatus.text === 'Popular' ? 'text-blue-600' : 'text-purple-600'
                  }`}>
                    {enrollmentStatus.text}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDtlCard;