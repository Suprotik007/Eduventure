import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        position: "top-right",
        theme: "colored",
        className: "bg-gradient-to-r from-emerald-500 to-teal-600"
      });
      queryClient.invalidateQueries(['allClasses']);
    },
    onError: () => toast.error('Failed to approve class')
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => axios.patch(`https://a12-server-gamma.vercel.app/classes/${id}/reject`),
    onSuccess: () => {
      toast.info('Class rejected successfully', {
        position: "top-right",
        theme: "colored",
        className: "bg-gradient-to-r from-amber-500 to-orange-600"
      });
      queryClient.invalidateQueries(['allClasses']);
    },
    onError: () => toast.error('Failed to reject class')
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-slate-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-600 font-medium">Loading classes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-gradient-to-br from-white to-slate-50">
        <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">Failed to Load Classes</h3>
        <p className="text-slate-500 mb-6 max-w-md mx-auto">
          There was an issue loading the class data. Please check your connection and try again.
        </p>
        <button 
          onClick={() => queryClient.invalidateQueries(['allClasses'])}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!classes?.length) {
    return (
      <div className="text-center py-12 bg-gradient-to-br from-white to-slate-50">
        <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">No Classes Submitted</h3>
        <p className="text-slate-500 mb-6 max-w-md mx-auto">
          There are currently no class requests awaiting approval. 
          New submissions from instructors will appear here automatically.
        </p>
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl text-slate-600">
          <svg className="w-5 h-5 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
          </svg>
          Waiting for submissions...
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const styles = {
      approved: 'bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 border border-emerald-200',
      rejected: 'bg-gradient-to-r from-rose-100 to-rose-50 text-rose-800 border border-rose-200',
      pending: 'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border border-amber-200'
    };
    return (
      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${styles[status] || 'bg-slate-100 text-slate-700'}`}>
        <span className={`w-2 h-2 rounded-full mr-2 ${status === 'approved' ? 'bg-emerald-500' : status === 'rejected' ? 'bg-rose-500' : 'bg-amber-500'}`}></span>
        {status}
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
              Class Approval Requests
            </h1>
            <p className="text-slate-500 text-lg">Review and manage class submissions from instructors</p>
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
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900">{classes.length}</div>
              <div className="text-xs sm:text-sm text-slate-500"> Requests</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-700">
                {classes.filter(c => c.status === 'approved').length}
              </div>
              <div className="text-xs sm:text-sm text-slate-500">Approved</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-amber-700">
                {classes.filter(c => c.status === 'pending').length}
              </div>
              <div className="text-xs sm:text-sm text-slate-500">Pending</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-rose-700">
                {classes.filter(c => c.status === 'rejected').length}
              </div>
              <div className="text-xs sm:text-sm text-slate-500">Rejected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Classes Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100/30 border-b border-slate-200">
              <tr>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Class Details
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 ">
              {classes.map((cls) => (
                <tr key={cls._id} className="group hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-blue-50/30 transition-all duration-300 border-b border-slate-100 last:border-b-0">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shadow-sm flex-shrink-0">
                        <img
                          src={cls.image}
                          alt={cls.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                          {cls.title}
                        </h4>
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                          {cls.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm font-medium text-slate-900">
                            ${cls.price}
                          </span>
                        
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img src={cls.teacherPhoto} alt="" />
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 flex items-center justify-center shadow-sm">
                        <span className="text-blue-700 font-medium text-sm">
                          {cls.teacherName?.charAt(0) || 'I'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{cls.teacherName}</p>
                        <p className="text-sm text-slate-600 truncate max-w-[180px]">{cls.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex flex-col gap-1">
                      {getStatusBadge(cls.status)}
                      {cls.status === 'pending' && (
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                          <span>Awaiting review</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex flex-col gap-2 min-w-[140px]">
                      <button
                        onClick={() => approveMutation.mutate(cls._id)}
                        disabled={cls.status !== 'pending' || approveMutation.isLoading}
                        className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                          cls.status !== 'pending'
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {approveMutation.isLoading && approveMutation.variables === cls._id ? 'Approving...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => rejectMutation.mutate(cls._id)}
                        disabled={cls.status !== 'pending' || rejectMutation.isLoading}
                        className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                          cls.status !== 'pending'
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-slate-200 to-slate-300 text-slate-700 hover:bg-slate-300 hover:-translate-y-0.5 active:translate-y-0'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        {rejectMutation.isLoading && rejectMutation.variables === cls._id ? 'Rejecting...' : 'Reject'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Note */}
      {classes.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">Guideline:</span> Review submissions within 24 hours. 
                  Approved classes become visible to students immediately. Rejected classes include feedback to the instructor.
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

export default ManageClasses;