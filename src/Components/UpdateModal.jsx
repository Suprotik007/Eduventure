import React from 'react';
import { useForm } from 'react-hook-form';

const UpdateModal = ({ isOpen, onClose, onUpdate, classData }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: classData?.title,
      price: classData?.price,
      description: classData?.description,
      image: classData?.image
    }
  });

  const onSubmit = (data) => {
    
    onUpdate( data);
   
    
    // reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed  z-50 top-0 left-0 w-full h-full bg-opacity-50 flex items-center  justify-center">
      <div className="bg-gray-900 border-4 border-gray-300 p-6 rounded-lg w-full max-w-md font-semibold shadow-lg">
        <h2 className="text-xl text-green-400 font-bold mb-4">Update Class</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('title')} placeholder="Title" className="input input-bordered w-full" />
          <input type="number"   step="0.01" {...register('price')} placeholder="Price" className="input input-bordered w-full" />
          <input {...register('image')} placeholder="Image URL" className="input input-bordered w-full" />
          <textarea {...register('description')} placeholder="Description" className="textarea textarea-bordered w-full"></textarea>
          <div className="flex justify-end gap-3">
            <button onClick={onClose} type="button" className="btn btn-outline btn-error ">Cancel</button>
            <button  type="submit" className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
