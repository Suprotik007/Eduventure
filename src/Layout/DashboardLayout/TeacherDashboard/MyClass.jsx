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
      toast.success('Class deleted successfully!', {
        position: "top-center",
        theme: "dark"
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
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
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
      toast.success('Class updated successfully!', {
        position: "top-center",
        theme: "dark"
      });
      queryClient.invalidateQueries(['myClasses']);
      setIsModalOpen(false);
    },
    onError: () => {
      toast.error('Failed to update class. Please try again.', {
        position: "top-center",
        theme: "dark"
      });
    }
  });

  const handleUpdate = (id, data) => {
    updateMutation.mutate({ id, data });
  };

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">My Classes</h1>
            <p className="text-gray-600">Manage and track your published courses</p>
          </div>
          <Link to="/dashboard/add-class">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add New Class
            </button>
          </Link>
        </div>
      </div>

      {/* Stats and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card-modern p-6 text-center cursor-pointer hover:scale-105 transition-all duration-300" onClick={() => setFilter('all')}>
          <div className="text-2xl font-bold text-gray-900">{classes.length}</div>
          <div className="text-sm text-gray-600">Total Classes</div>
        </div>
        <div className="card-modern p-6 text-center cursor-pointer hover:scale-105 transition-all duration-300" onClick={() => setFilter('approved')}>
          <div className="text-2xl font-bold text-green-600">
            {classes.filter(c => c.status === 'approved').length}
          </div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        <div className="card-modern p-6 text-center cursor-pointer hover:scale-105 transition-all duration-300" onClick={() => setFilter('pending')}>
          <div className="text-2xl font-bold text-yellow-600">
            {classes.filter(c => c.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="card-modern p-6 text-center cursor-pointer hover:scale-105 transition-all duration-300" onClick={() => setFilter('rejected')}>
          <div className="text-2xl font-bold text-red-600">
            {classes.filter(c => c.status === 'rejected').length}
          </div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            filter === 'all'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            filter === 'approved'
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Approved
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            filter === 'pending'
              ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('rejected')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            filter === 'rejected'
              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Rejected
        </button>
      </div>

      {/* Classes Grid */}
      {classes.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Classes Found</h3>
          <p className="text-gray-600 mb-6">
            {filter === 'all' 
              ? "You haven't created any classes yet."
              : `No ${filter} classes found.`
            }
          </p>
          <Link to="/dashboard/add-class">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300">
              Create Your First Class
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div key={cls._id} className="card-modern overflow-hidden hover:-translate-y-2 transition-all duration-500">
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  {getStatusBadge(cls.status)}
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-gray-800">
                    ${cls.price}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{cls.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{cls.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    {cls.totalEnrolled || 0} enrolled
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setSelectedClass(cls);
                      setIsModalOpen(true);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-200"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(cls._id, cls.title)}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-200"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/dashboard/my-class/${cls._id}`}
                    className={`col-span-2 px-4 py-2 rounded-lg font-medium text-center transition-all duration-200 ${
                      cls.status !== 'approved'
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90'
                    }`}
                  >
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

      <ToastContainer />
    </div>
  );
};

export default MyClass;