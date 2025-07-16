import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const TeacherReq = () => {
  const queryClient = useQueryClient();


  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['allTeacherRequests'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/admin/teacher-requests');
      return res.data;
    },
  });


  const approveMutation = useMutation({
    mutationFn: (email) =>
      axios.patch(`http://localhost:5000/teacher-requests/approve/${email}`),
    onSuccess: () => {
      toast.success('Request approved!');
      queryClient.invalidateQueries(['allTeacherRequests']);
    },
    onError: () => toast.error('Approval failed'),
  });

  const rejectMutation = useMutation({
    mutationFn: (email) =>
      axios.patch(`http://localhost:5000/teacher-requests/reject/${email}`),
    onSuccess: () => {
      toast.info('Request rejected.');
      queryClient.invalidateQueries(['allTeacherRequests']);
    },
    onError: () => toast.error('Rejection failed'),
  });

  if (isLoading) return <p className="text-center text-white">Loading...</p>;

  

  return (
    <div className="overflow-x-auto  p-6">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Teacher Requests</h2>
      <table className="table w-full rounded-3xl bg-black text-white border">
        <thead>
          <tr className="text-amber-300">
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Experience</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>
                <img
                  src={req.photo || 'https://via.placeholder.com/50'}
                  alt="user"
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td>{req.name}</td>
              <td>{req.email}</td>
              <td>{req.experience}</td>
              <td>{req.title}</td>
              <td>{req.category}</td>
              <td className={`font-bold ${req.status === 'approved' ? 'text-green-400' : req.status === 'rejected' ? 'text-red-400' : 'text-yellow-400'}`}>
                {req.status}
              </td>
              <td className="flex flex-col gap-2 md:flex-row">
                <button
                  className="btn btn-success btn-xs"
                  disabled={req.status === 'rejected' || req.status === 'approved'}
                  onClick={() => approveMutation.mutate(req.email)}
                >
                  Approve
                </button>
                <button
                  className="btn btn-error btn-xs"
                  disabled={req.status === 'rejected'}
                  onClick={() => rejectMutation.mutate(req.email)}
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

export default TeacherReq;
