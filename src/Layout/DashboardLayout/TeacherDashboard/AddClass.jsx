import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../../Providers/AuthProvider';

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    const newClass = {
      title: data.title,
      teacherName: user.displayName,
      email: user.email,
      price: parseFloat(data.price),
      description: data.description,
      image: data.image,
      category: data.category,
      duration: data.duration,
      level: data.level,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    try {
      await axios.post(`https://a12-server-gamma.vercel.app/classes`, newClass);
      toast.success('Class submitted successfully! It will be reviewed by admins.', {
        position: "top-center",
        theme: "dark"
      });
      reset();
      setTimeout(() => navigate('/dashboard/my-class'), 2000);
    } catch (err) {
      toast.error('Failed to add class. Please try again.', {
        position: "top-center",
        theme: "dark"
      });
    }
  };

  const categories = [
    'Web Development',
    'Data Science',
    'UI/UX Design',
    'Digital Marketing',
    'Business',
    'Creative Arts',
    'Languages',
    'Personal Development'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-8  px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-700">Create New Class</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Add New Course
          </h1>
          <p className="text-gray-600">Share your expertise with learners worldwide</p>
        </div>

        {/* Form */}
        <div className="card-modern p-8 border border-gray-200 bg-white shadow-lg rounded-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Teacher Info */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl mb-6">
              <div className="flex items-center space-x-3">
                <img
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=4F46E5&color=fff`}
                  alt={user?.displayName}
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                <div>
                  <p className="font-medium text-gray-900">{user?.displayName}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('title', { required: "Course title is required" })}
                placeholder="e.g., Full Stack Web Development Bootcamp"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Category and Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('category', { required: "Category is required" })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('level', { required: "Level is required" })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                >
                  <option value="">Select level</option>
                  {levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.level && (
                  <p className="mt-1 text-sm text-red-600">{errors.level.message}</p>
                )}
              </div>
            </div>

            {/* Price and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    {...register('price', { 
                      required: "Price is required",
                      min: { value: 0, message: "Price must be positive" }
                    })}
                    placeholder="29.99"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (hours) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    {...register('duration', { 
                      required: "Duration is required",
                      min: { value: 1, message: "Minimum 1 hour" }
                    })}
                    placeholder="12"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">hrs</span>
                </div>
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                )}
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                {...register('image', { 
                  required: "Image URL is required",
                  pattern: {
                    value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))/i,
                    message: "Please enter a valid image URL"
                  }
                })}
                placeholder="https://example.com/course-image.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('description', { 
                  required: "Description is required",
                  minLength: { value: 50, message: "Minimum 50 characters" }
                })}
                placeholder="Describe what students will learn in this course..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">Minimum 50 characters</p>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
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
                  'Submit for Review'
                )}
              </button>
              <p className="text-center text-sm text-gray-500 mt-3">
                Your class will be reviewed by admins before publishing
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddClass;