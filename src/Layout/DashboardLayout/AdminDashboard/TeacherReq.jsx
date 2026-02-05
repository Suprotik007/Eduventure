import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.success(' Teacher request approved successfully!', {
        position: "top-right",
        theme: "colored",
        className: "bg-gradient-to-r from-emerald-500 to-teal-600"
      });
      queryClient.invalidateQueries(['allTeacherRequests']);
    },
    onError: () => toast.error('❌ Failed to approve request'),
  });

  const rejectMutation = useMutation({
    mutationFn: (email) =>
      axios.patch(`https://a12-server-gamma.vercel.app/teacher-requests/reject/${email}`),
    onSuccess: () => {
      toast.warning('Request rejected successfully', {
        position: "top-right",
        theme: "colored",
        className: "bg-gradient-to-r from-amber-500 to-orange-600"
      });
      queryClient.invalidateQueries(['allTeacherRequests']);
    },
    onError: () => toast.error('❌ Failed to reject request'),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-slate-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-600 font-medium">Loading applications...</p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const styles = {
      approved: 'bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm',
      rejected: 'bg-gradient-to-r from-rose-100 to-rose-50 text-rose-800 border border-rose-200 shadow-sm',
      pending: 'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border border-amber-200 shadow-sm'
    };
    return (
      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${styles[status] || 'bg-slate-100 text-slate-700'}`}>
        <span className={`w-2 h-2 rounded-full mr-2 ${status === 'approved' ? 'bg-emerald-500' : status === 'rejected' ? 'bg-rose-500' : 'bg-amber-500'}`}></span>
        {status}
      </span>
    );
  };

  const getExperienceBadge = (exp) => {
    const styles = {
      beginner: 'bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-700 border border-blue-200',
      'mid-level': 'bg-gradient-to-r from-purple-50 to-purple-100/50 text-purple-700 border border-purple-200',
      experienced: 'bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-700 border border-emerald-200'
    };
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles[exp] || 'bg-slate-100 text-slate-700'}`}>
        {exp}
      </span>
    );
  };

 

  return (
    <div className="p-4 md:p-8 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Teacher Applications
            </h1>
            <p className="text-slate-500 text-lg">Review and manage instructor applications</p>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
            </svg>
            <span className="text-sm">Real-time updates</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <svg className="w-6 h-6 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{requests.length}</div>
              <div className="text-sm text-slate-500">Applications</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-700">
                {requests.filter(r => r.status === 'approved').length}
              </div>
              <div className="text-sm text-slate-500">Approved</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-700">
                {requests.filter(r => r.status === 'pending').length}
              </div>
              <div className="text-sm text-slate-500">Pending </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-rose-700">
                {requests.filter(r => r.status === 'rejected').length}
              </div>
              <div className="text-sm text-slate-500">Rejected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {requests.length === 0 ? (
          <div className="bg-gradient-to-br from-white to-slate-50 p-12 text-center border-t border-slate-100">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-16 h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No Applications Yet</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              There are currently no teacher applications pending review.
              New applications will appear here automatically.
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl text-slate-600">
              <svg className="w-5 h-5 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
              </svg>
              Waiting for applications...
            </div>
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100/30 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Applications ({requests.length})</h3>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-emerald-400 rounded-full"></span>
                    <span>Approved</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-amber-400 rounded-full"></span>
                    <span>Pending</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-rose-400 rounded-full"></span>
                    <span>Rejected</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {requests.map((req) => (
                    <tr key={req._id} className="group hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-blue-50/30 transition-all duration-300">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow-lg">
                              <img
                                src={req.photo || `https://ui-avatars.com/api/?name=${req.name}&background=6366f1&color=fff&bold=true`}
                                alt={req.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{req.name}</p>
                            <p className="text-sm text-slate-600">{req.email}</p>
                            <div className="mt-1">
                              {getExperienceBadge(req.experience)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-slate-900">{req.title}</p>
                            <p className="text-xs text-slate-500 mt-1">{req.category}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                            </svg>
                            <span className="text-xs text-slate-600">
                              Applied: {new Date(req.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          {getStatusBadge(req.status)}
                          {req.status === 'pending' && (
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                              <span>Awaiting review</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2 min-w-[160px]">
                          <button
                            onClick={() => approveMutation.mutate(req.email)}
                            disabled={req.status !== 'pending' || approveMutation.isLoading}
                            className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                              req.status !== 'pending'
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0'
                            }`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {approveMutation.isLoading && approveMutation.variables === req.email ? 'Approving...' : 'Approve'}
                          </button>
                          <button
                            onClick={() => rejectMutation.mutate(req.email)}
                            disabled={req.status !== 'pending' || rejectMutation.isLoading}
                            className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                              req.status !== 'pending'
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-slate-200 to-slate-300 text-slate-700 hover:bg-slate-300 hover:-translate-y-0.5 active:translate-y-0'
                            }`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            {rejectMutation.isLoading && rejectMutation.variables === req.email ? 'Rejecting...' : 'Reject'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Footer Note */}
      {requests.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">Tip:</span> Review applications within 48 hours for the best candidate experience. 
                  Approved instructors will receive access to create courses immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default TeacherReq;