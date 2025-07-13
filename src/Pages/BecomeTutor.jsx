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
    formState: { errors }
  } = useForm();

  // Fetch existing request or user role
  const { data: requestData, refetch } = useQuery({
    queryKey: ['teacherRequest', user?.email],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/teacher-requests/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  // Handle new submission
  const mutation = useMutation({
    mutationFn: async (data) => {
      return await axios.post(`${import.meta.env.VITE_API_URL}/teacher-requests`, data);

    },
    onSuccess: () => {
      toast.success('Submitted for review!');
      reset();
      refetch();
    },
    onError: () => {
      toast.error('Submission failed. Try again.');
    }
  });

  // Submit form
  const onSubmit = (data) => {
    const application = {
      name: user?.displayName,
      photo: user?.photoURL,
      email: user?.email,
      experience: data.experience,
      title: data.title,
      category: data.category,
      status: 'pending',
    };
    mutation.mutate(application);
  };

  const handleResubmit = async () => {
    try {
      await axios.patch(`/teacher-requests/resubmit/${user.email}`, { status: 'pending' });
      toast.success('Resubmitted for review!');
      refetch();
    } catch (err) {
      toast.error('Failed to resubmit');
    }
  };

  
  if (requestData?.role === 'teacher') {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold text-green-500">You are already a teacher.</h2>
      </div>
    );
  }

  // Rejected
  if (requestData?.status === 'rejected') {
    return (
      <div className="p-6 text-center space-y-4">
        <h2 className="text-xl font-semibold text-red-500">Your previous request was rejected.</h2>
        <button
          onClick={handleResubmit}
          className="btn bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          Request Again
        </button>
      </div>
    );
  }

  // Pending
  if (requestData?.status === 'pending') {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-amber-700">Your application is under review.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-black text-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Teach on Edventure</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="text-center">
          <label className="block font-semibold">Profile Image</label>
          <img
            src={user?.photoURL}
            alt="profile"
            className="w-20 h-20 mx-auto rounded-full mt-2 border"
          />
        </div>

        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            readOnly
            value={user?.displayName || ''}
            className="input input-bordered w-full text-black font-semibold"
          />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            readOnly
            value={user?.email || ''}
            className="input input-bordered w-full text-black font-semibold"
          />
        </div>

        <div>
          <label className="block font-semibold">Experience Level</label>
          <select
            {...register('experience', { required: true })}
            className="select select-bordered text-black font-semibold w-full"
          >
            <option value="">Select experience level</option>
            <option value="beginner">Beginner</option>
            <option value="mid-level">Mid-Level</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Teaching Title</label>
          <input
            type="text"
            {...register('title', { required: true })}
            placeholder="e.g., Frontend Developer Bootcamp"
            className="input input-bordered text-black font-semibold w-full"
          />
        </div>

        <div>
          <label className="block font-semibold">Category</label>
          <select
            {...register('category', { required: true })}
            className="select select-bordered text-black font-semibold w-full"
          >
            <option value="">Select category</option>
            <option value="Web Development">Web Development</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Data Science">Data Science</option>
            <option value="UI/UX Design">UI/UX Design</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary text-white w-full">
          Submit for Review
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default BecomeTutor;
