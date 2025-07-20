import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router';

import { toast } from 'react-toastify';
import { AuthContext } from '../../../Providers/AuthProvider';

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
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
      status: 'pending'
    };

    try {
      await axios.post(`https://a12-server-gamma.vercel.app/classes`, newClass);
    
      reset();
      navigate('/dashboard/my-class'); 
    } catch (err) {
      toast.error('Failed to add class');
    }
  };

  return (
    <div className="w-sm md:w-xl mx-auto mt-10 bg-black rounded-3xl text-white p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add a New Class</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            {...register('title', { required: true })}
            className="input input-bordered w-full text-black"
            placeholder="Enter class title"
          />
          {errors.title && <span className="text-red-400 text-sm">Title is required</span>}
        </div>

        <div>
          <label className="block font-semibold">Teacher Name</label>
          <input
            type="text"
            readOnly
            value={user?.displayName}
            className="input input-bordered w-full text-black"
          />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            readOnly
            value={user?.email}
            className="input input-bordered w-full text-black"
          />
        </div>

        <div>
          <label className="block font-semibold">Price ($)</label>
          <input
            type="number"
            step="0.01"
            {...register('price', { required: true })}
            className="input input-bordered w-full text-black"
            placeholder="Enter price"
          />
          {errors.price && <span className="text-red-400 text-sm">Price is required</span>}
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            {...register('description', { required: true })}
            className="textarea textarea-bordered w-full text-black"
            placeholder="Describe your class"
          />
          {errors.description && <span className="text-red-400 text-sm">Description is required</span>}
        </div>

        <div>
          <label className="block font-semibold">Image URL</label>
          <input
            type="text"
            {...register('image', { required: true })}
            className="input input-bordered w-full text-black"
            placeholder="Image URL"
          />
          {errors.image && <span className="text-red-400 text-sm">Image URL is required</span>}
        </div>

        <button
          type="submit"
          className="btn w-full btn-primary  text-white font-bold"
        >
          Add Class
        </button>
        
      </form>
    </div>
  );
};

export default AddClass;
