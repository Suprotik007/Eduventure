import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../Providers/AuthProvider';

const BecomeTutor = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const { data: requestData, isLoading, refetch } = useQuery({
    queryKey: ['teacherRequest', user?.email],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/teacher-requests/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      return await axios.post(`${import.meta.env.VITE_API_URL}/teacher-requests`, data);
    },
    onSuccess: () => {
      toast.success('Application submitted successfully! Our team will review it shortly.', {
        position: "top-center",
        theme: "dark"
      });
      reset();
      refetch();
    },
    onError: () => {
      toast.error('Submission failed. Please try again.', {
        position: "top-center",
        theme: "dark"
      });
    }
  });

  const onSubmit = (data) => {
    const application = {
      name: user?.displayName,
      photo: user?.photoURL,
      email: user?.email,
      experience: data.experience,
      title: data.title,
      category: data.category,
      bio: data.bio,
      qualifications: data.qualifications,
      status: 'pending',
      appliedDate: new Date().toISOString()
    };
    mutation.mutate(application);
  };

  const handleResubmit = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/teacher-requests/resubmit/${user.email}`, { status: 'pending' });
      toast.success('Application resubmitted for review!');
      refetch();
    } catch (err) {
      toast.error('Failed to resubmit');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Already approved or teacher
  if (requestData?.role === 'teacher' || requestData?.status === 'approved') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-lg mx-auto">
          <div className="card-modern p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome, Instructor!</h2>
            <p className="text-gray-600 mb-6">You are already an approved instructor. Start creating amazing courses!</p>
            <div className="space-y-3">
              <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300">
                Go to Dashboard
              </button>
              <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300">
                View My Classes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Rejected
  if (requestData?.status === 'rejected') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-lg mx-auto">
          <div className="card-modern p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Application Rejected</h2>
            <p className="text-gray-600 mb-6">Your previous application was not approved. You can improve and resubmit.</p>
            <button
              onClick={handleResubmit}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300"
            >
              Resubmit Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pending
  if (requestData?.status === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-lg mx-auto">
          <div className="card-modern p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Under Review</h2>
            <p className="text-gray-600 mb-6">Your application is currently being reviewed by our team. We'll notify you soon.</p>
            <div className="animate-pulse">
              <div className="h-2 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Become an Instructor
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Share your knowledge, inspire learners, and earn by teaching what you love
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Info Panel */}
          <div className="lg:col-span-1">
            <div className="card-modern p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=4F46E5&color=fff`}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
                  />
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <h3 className="text-xl font-bold mt-4 text-gray-900">{user?.displayName}</h3>
                <p className="text-gray-600 text-sm">{user?.email}</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-semibold text-blue-700 mb-2">Why Teach With Us?</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Reach thousands of students
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Flexible schedule
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Competitive earnings
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-2">
            <div className="card-modern border-2 border-gray-300 rounded-2xl p-8 shadow-lg animate-fade-in-up">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Instructor Application</h2>
                  <p className="text-gray-600">Complete the form below to apply</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['beginner', 'mid-level', 'experienced'].map((level) => (
                      <label key={level} className="relative">
                        <input
                          type="radio"
                          value={level}
                          {...register('experience', { required: true })}
                          className="peer sr-only"
                        />
                        <div className="p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all duration-200">
                          <div className="text-center">
                            <div className="font-medium text-gray-900 capitalize">{level.replace('-', ' ')}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {level === 'beginner' && '< 2 years'}
                              {level === 'mid-level' && '2-5 years'}
                              {level === 'experienced' && '5+ years'}
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-600">Please select your experience level</p>
                  )}
                </div>

                {/* Teaching Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('title', { required: true })}
                    placeholder="e.g., Full Stack Web Development Bootcamp"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">Course title is required</p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('category', { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  >
                    <option value="">Select a category</option>
                    {['Web Development', 'Data Science', 'UI/UX Design', 'Digital Marketing', 'Graphic Design', 'Business', 'Creative Arts', 'Languages'].map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">Please select a category</p>
                  )}
                </div>

                {/* Qualifications */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualifications & Certifications
                  </label>
                  <textarea
                    {...register('qualifications')}
                    placeholder="List your relevant degrees, certifications, or achievements..."
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teaching Philosophy
                  </label>
                  <textarea
                    {...register('bio')}
                    placeholder="Describe your teaching approach and what makes your courses unique..."
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                  <p className="text-center text-sm text-gray-500 mt-3">
                    Your application will be reviewed within 2-3 business days
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BecomeTutor;