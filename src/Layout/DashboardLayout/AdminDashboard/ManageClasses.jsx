import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const ManageClasses = () => {
  const queryClient = useQueryClient();

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ['allClasses'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/classes');
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: (id) => axios.patch(`http://localhost:5000/classes/${id}/approve`),
    onSuccess: () => {
      toast.success('Class approved');
      queryClient.invalidateQueries(['allClasses']);
    }
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => axios.patch(`http://localhost:5000/classes/${id}/reject`),
    onSuccess: () => {
      toast.success('Class rejected');
      queryClient.invalidateQueries(['allClasses']);
    }
  });

  if (isLoading) return <div>Loading classes...</div>;

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 ">All Submitted Classes</h2>
      <table className="table w-full ">
        <thead className='text-yellow-400 bg-black'>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Email</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls._id} className="bg-black font-semibold rounded-3xl text-white">
              <td>{cls.title}</td>
              <td>
                <img src={cls.image} alt={cls.title} className="w-16 h-16 rounded object-cover" />
              </td>
              <td>{cls.email}</td>
              <td>{cls.description.slice(0, 30)}...</td>
              <td>
                <span className={
                  cls.status === 'approved'
                    ? 'text-green-600'
                    : cls.status === 'rejected'
                    ? 'text-red-600'
                    : 'text-yellow-500'
                }>
                  {cls.status}
                </span>
              </td>
              <td className="space-y-2">
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => approveMutation.mutate(cls._id)}
                  disabled={cls.status !== 'pending'}
                >
                  Approve
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => rejectMutation.mutate(cls._id)}
                  disabled={cls.status !== 'pending'}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default ManageClasses;
