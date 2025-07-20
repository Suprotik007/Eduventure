import axios from "axios";
import { useForm } from "react-hook-form";
import React from "react";
import { toast } from "react-toastify";

const AssignmentModal = ({ isOpen, onClose, classId, onSuccess }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    data.classId = classId;
    try {
      await axios.post('https://a12-server-gamma.vercel.app/progress/assignments', data);
      toast.success("Assignment created!");
      reset();
      onSuccess(); 
      onClose();
    } catch (err) {
      toast.error("Failed to create assignment");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center  bg-opacity-40">
      <div className=" bg-black  border-2 border-amber-700 p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold text-yellow-400 mb-4">Create Assignment</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("title")} placeholder="Title" required className="input font-semibold input-bordered w-full" />
          <input type="date" {...register("deadline")} required className="input  font-semibold input-bordered w-full" />
          <textarea {...register("description")} placeholder="Description" required className=" font-semibold textarea  textarea-bordered w-full"></textarea>

          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-outline btn-error" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Assignment</button>
          </div>
        </form>
      </div>
   
    </div>
  );
};
export default AssignmentModal
