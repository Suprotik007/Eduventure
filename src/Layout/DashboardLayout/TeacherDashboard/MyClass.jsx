import React, { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router'; 
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import UpdateModal from '../../../Components/UpdateModal';

const MyClass = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ['myClasses', user?.email, filter],
    queryFn: async () => {
      const res = await axios.get(`https://a12-server-gamma.vercel.app/classes/teacher?email=${user?.email}`);
      let filtered = res.data;
      if (filter !== 'all') {
        filtered = filtered.filter(cls => cls.status === filter);
      }
      return filtered;
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`https://a12-server-gamma.vercel.app/classes/${id}`);
    },
    onSuccess: () => {
      toast.success('✨ Class deleted successfully!', {
        position: "top-right",
        theme: "colored",
        className: "bg-gradient-to-r from-emerald-500 to-teal-600"
      });
      queryClient.invalidateQueries(['myClasses']);
    },
  });

  const handleDelete = (id, title) => {
    Swal.fire({
      title: 'Delete Class?',
      text: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      background: '#f8fafc',
      color: '#0f172a',
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
        title: 'text-slate-900 font-bold',
        htmlContainer: 'text-slate-600'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      return await axios.patch(`https://a12-server-gamma.vercel.app/classes/${id}`, data);
    },
    onSuccess: () => {
      toast.success('📝 Class updated successfully!', {
        position: "top-right",
        theme: "colored",
        className: "bg-gradient-to-r from-blue-500 to-indigo-600"
      });
      queryClient.invalidateQueries(['myClasses']);
      setIsModalOpen(false);
    },
    onError: () => {
      toast.error('❌ Failed to update class', {
        position: "top-right",
        theme: "colored"
      });
    }
  });

  const handleUpdate = (id, data) => {
    updateMutation.mutate({ id, data });
  };

  const getStatusBadge = (status) => {
    const styles = {
      approved: 'bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 border border-emerald-200',
      rejected: 'bg-gradient-to-r from-rose-100 to-rose-50 text-rose-800 border border-rose-200',
      pending: 'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border border-amber-200'
    };
    return (
      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${styles[status] || 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
        <span className={`w-2 h-2 rounded-full mr-2 ${status === 'approved' ? 'bg-emerald-500' : status === 'rejected' ? 'bg-rose-500' : 'bg-amber-500'}`}></span>
        {status}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-slate-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-600 font-medium">Loading your classes...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              My Classes
            </h1>
            <p className="text-slate-500 text-lg">Manage and track your published courses</p>
          </div>
          <Link to="/dashboard/add-class">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add New Class
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div 
          onClick={() => setFilter('all')}
          className={`bg-white p-4 sm:p-6 rounded-2xl shadow-sm border cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
            filter === 'all' 
              ? 'border-blue-300 ring-2 ring-blue-500/20' 
              : 'border-slate-100 hover:border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all ${
              filter === 'all'
                ? 'bg-gradient-to-r from-blue-100 to-indigo-100'
                : 'bg-gradient-to-br from-slate-100 to-slate-200'
            }`}>
              <svg className={`w-5 h-5 sm:w-6 sm:h-6 transition-all ${
                filter === 'all' ? 'text-blue-600' : 'text-slate-600'
              }`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900">{classes.length}</div>
              <div className="text-xs sm:text-sm text-slate-500"> Classes</div>
            </div>
          </div>
        </div>

        <div 
          onClick={() => setFilter('approved')}
          className={`bg-white p-4 sm:p-6 rounded-2xl shadow-sm border cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
            filter === 'approved' 
              ? 'border-emerald-300 ring-2 ring-emerald-500/20' 
              : 'border-slate-100 hover:border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all ${
              filter === 'approved'
                ? 'bg-gradient-to-r from-emerald-100 to-teal-100'
                : 'bg-gradient-to-br from-slate-100 to-slate-200'
            }`}>
              <svg className={`w-5 h-5 sm:w-6 sm:h-6 transition-all ${
                filter === 'approved' ? 'text-emerald-600' : 'text-slate-600'
              }`} fill="currentColor" viewBox="0 0 20 20">
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

        <div 
          onClick={() => setFilter('pending')}
          className={`bg-white p-4 sm:p-6 rounded-2xl shadow-sm border cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
            filter === 'pending' 
              ? 'border-amber-300 ring-2 ring-amber-500/20' 
              : 'border-slate-100 hover:border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all ${
              filter === 'pending'
                ? 'bg-gradient-to-r from-amber-100 to-orange-100'
                : 'bg-gradient-to-br from-slate-100 to-slate-200'
            }`}>
              <svg className={`w-5 h-5 sm:w-6 sm:h-6 transition-all ${
                filter === 'pending' ? 'text-amber-600' : 'text-slate-600'
              }`} fill="currentColor" viewBox="0 0 20 20">
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

        <div 
          onClick={() => setFilter('rejected')}
          className={`bg-white p-4 sm:p-6 rounded-2xl shadow-sm border cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
            filter === 'rejected' 
              ? 'border-rose-300 ring-2 ring-rose-500/20' 
              : 'border-slate-100 hover:border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all ${
              filter === 'rejected'
                ? 'bg-gradient-to-r from-rose-100 to-pink-100'
                : 'bg-gradient-to-br from-slate-100 to-slate-200'
            }`}>
              <svg className={`w-5 h-5 sm:w-6 sm:h-6 transition-all ${
                filter === 'rejected' ? 'text-rose-600' : 'text-slate-600'
              }`} fill="currentColor" viewBox="0 0 20 20">
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

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['all', 'approved', 'pending', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
              filter === status
                ? status === 'approved' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
                  : status === 'pending' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                  : status === 'rejected' ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <span className="capitalize">{status}</span>
            {status !== 'all' && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                filter === status ? 'bg-white/20' : 'bg-slate-300'
              }`}>
                {classes.filter(c => c.status === status).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Classes Grid */}
      {classes.length === 0 ? (
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 md:p-12 text-center border border-slate-200">
          <div className="max-w-md mx-auto">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-16 h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              {filter === 'all' ? "Start Your Teaching Journey" : `No ${filter} Classes`}
            </h3>
            <p className="text-slate-500 mb-8">
              {filter === 'all' 
                ? 'Create your first class and start sharing knowledge with students'
                : `You don't have any ${filter} classes. ${filter === 'pending' ? 'Submitted classes will appear here' : ''}`
              }
            </p>
            <Link to="/dashboard/add-class">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1">
                Create Your First Class
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div 
              key={cls._id} 
              className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:border-slate-200 transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 z-20">
                  {getStatusBadge(cls.status)}
                </div>
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-sm font-bold text-slate-800 shadow-sm">
                    ${cls.price}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 min-h-[3rem] group-hover:text-blue-700 transition-colors">
                  {cls.title}
                </h3>
                <p className="text-slate-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                  {cls.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    {cls.totalEnrolled || 0} enrolled
                  </div>
                  {cls.seats !== undefined && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1.5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      {cls.seats} seats
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setSelectedClass(cls);
                      setIsModalOpen(true);
                    }}
                    className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(cls._id, cls.title)}
                    className="px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Delete
                  </button>
                  <Link
                    to={`/dashboard/my-class/${cls._id}`}
                    className={`col-span-2 px-4 py-2.5 rounded-xl font-medium text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                      cls.status !== 'approved'
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {isModalOpen && selectedClass && (
        <UpdateModal
          isOpen={isModalOpen}
          classData={selectedClass}
          onClose={() => setIsModalOpen(false)}
          onUpdate={(data) => handleUpdate(selectedClass._id, data)}
        />
      )}

      {/* Footer Note */}
      {classes.length > 0 && (
        <div className="mt-12 pt-8 border-t border-slate-100">
          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>Showing {classes.length} classes • Click cards for quick actions</span>
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

export default MyClass;