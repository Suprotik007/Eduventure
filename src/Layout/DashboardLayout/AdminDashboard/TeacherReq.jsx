import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const TeacherReq = () => {
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['allTeacherRequests'],
    queryFn: async () => {
      const res = await axios.get('https://a12-server-gamma.vercel.app/admin/teacher-requests');
      return res.data;
    },
    retry: 2,
  });

  const approveMutation = useMutation({
    mutationFn: (email) =>
      axios.patch(`https://a12-server-gamma.vercel.app/teacher-requests/approve/${email}`),
    onSuccess: () => {
      toast.success('Teacher request approved successfully!', {
        position: "top-center",
        theme: "dark"
      });
      queryClient.invalidateQueries(['allTeacherRequests']);
    },
    onError: () => toast.error('Failed to approve request'),
  });

  const rejectMutation = useMutation({
    mutationFn: (email) =>
      axios.patch(`https://a12-server-gamma.vercel.app/teacher-requests/reject/${email}`),
    onSuccess: () => {
      toast.success('Teacher request rejected', {
        position: "top-center",
        theme: "dark"
      });
      queryClient.invalidateQueries(['allTeacherRequests']);
    },
    onError: () => toast.error('Failed to reject request'),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const styles = {
      approved: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700',
      rejected: 'bg-gradient-to-r from-red-100 to-red-200 text-red-700',
      pending: 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700'
    };
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
        {status}
      </span>
    );
  };

  const getExperienceBadge = (exp) => {
    const styles = {
      beginner: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700',
      'mid-level': 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700',
      experienced: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700'
    };
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles[exp] || 'bg-gray-100 text-gray-700'}`}>
        {exp}
      </span>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Teacher Applications</h2>
        <p className="text-gray-600">Review and manage instructor applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card-modern p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">{requests.length}</div>
          <div className="text-sm text-gray-600">Total Applications</div>
        </div>
        <div className="card-modern p-6 text-center">
          <div className="text-2xl font-bold text-green-600">
            {requests.filter(r => r.status === 'approved').length}
          </div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        <div className="card-modern p-6 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {requests.filter(r => r.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="card-modern p-6 text-center">
          <div className="text-2xl font-bold text-red-600">
            {requests.filter(r => r.status === 'rejected').length}
          </div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </div>

      {/* Applications List */}
      <div className="card-modern overflow-hidden">
        {requests.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications</h3>
            <p className="text-gray-600">No pending teacher applications</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={req.photo || `https://ui-avatars.com/api/?name=${req.name}&background=4F46E5&color=fff`}
                          alt={req.name}
                          className="w-12 h-12 rounded-full border-2 border-white shadow"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{req.name}</p>
                          <p className="text-sm text-gray-600">{req.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-900 font-medium">{req.title}</p>
                          <p className="text-xs text-gray-600">{req.category}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getExperienceBadge(req.experience)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(req.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => approveMutation.mutate(req.email)}
                          disabled={req.status !== 'pending'}
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                            req.status !== 'pending'
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90'
                          }`}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectMutation.mutate(req.email)}
                          disabled={req.status !== 'pending'}
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                            req.status !== 'pending'
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
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default TeacherReq;