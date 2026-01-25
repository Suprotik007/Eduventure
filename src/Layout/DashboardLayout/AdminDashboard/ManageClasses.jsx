import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const ManageClasses = () => {
  const queryClient = useQueryClient();

  const { data: classes = [], isLoading, error } = useQuery({
    queryKey: ['allClasses'],
    queryFn: async () => {
      const res = await axios.get('https://a12-server-gamma.vercel.app/classes');
      return res.data;
    },
    retry: 2,
  });

  const approveMutation = useMutation({
    mutationFn: (id) => axios.patch(`https://a12-server-gamma.vercel.app/classes/${id}/approve`),
    onSuccess: () => {
      toast.success('Class approved successfully!', {
        position: "top-center",
        theme: "dark"
      });
      queryClient.invalidateQueries(['allClasses']);
    },
    onError: () => toast.error('Failed to approve class')
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => axios.patch(`https://a12-server-gamma.vercel.app/classes/${id}/reject`),
    onSuccess: () => {
      toast.success('Class rejected', {
        position: "top-center",
        theme: "dark"
      });
      queryClient.invalidateQueries(['allClasses']);
    },
    onError: () => toast.error('Failed to reject class')
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Classes</h3>
        <p className="text-gray-600">Please try again later</p>
      </div>
    );
  }

  if (!classes?.length) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Classes Submitted</h3>
        <p className="text-gray-600">No class requests available for review</p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const styles = {
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
      pending: 'bg-yellow-100 text-yellow-700'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Class Approval Requests</h2>
        <p className="text-gray-600">Review and manage class submissions from instructors</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card-modern p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">{classes.length}</div>
          <div className="text-sm text-gray-600">Total Requests</div>
        </div>
        <div className="card-modern p-6 text-center">
          <div className="text-2xl font-bold text-green-600">
            {classes.filter(c => c.status === 'approved').length}
          </div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        <div className="card-modern p-6 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {classes.filter(c => c.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="card-modern p-6 text-center">
          <div className="text-2xl font-bold text-red-600">
            {classes.filter(c => c.status === 'rejected').length}
          </div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </div>

      {/* Table */}
      <div className="card-modern overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Class Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {classes.map((cls) => (
                <tr key={cls._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={cls.image}
                        alt={cls.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{cls.title}</h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {cls.description}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">${cls.price}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {cls.teacherName?.charAt(0) || 'I'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{cls.teacherName}</p>
                        <p className="text-sm text-gray-600">{cls.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(cls.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => approveMutation.mutate(cls._id)}
                        disabled={cls.status !== 'pending'}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                          cls.status !== 'pending'
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90'
                        }`}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectMutation.mutate(cls._id)}
                        disabled={cls.status !== 'pending'}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                          cls.status !== 'pending'
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:opacity-90'
                        }`}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ManageClasses;