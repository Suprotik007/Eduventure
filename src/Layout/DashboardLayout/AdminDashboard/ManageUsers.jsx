import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';

const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', search, selectedRole],
    queryFn: async () => {
      let url = `https://a12-server-gamma.vercel.app/users`;
      const params = [];
      if (search) params.push(`search=${search}`);
      if (selectedRole !== "all") params.push(`role=${selectedRole}`);
      if (params.length > 0) url += `?${params.join('&')}`;
      
      const res = await axios.get(url);
      return res.data;
    }
  });

  const makeAdminMutation = useMutation({
    mutationFn: async (email) => {
      return await axios.patch(`https://a12-server-gamma.vercel.app/users/make-admin/${email}`);
    },
    onSuccess: () => {
      toast.success('User promoted to admin successfully!', {
        position: "top-center",
        theme: "dark"
      });
      queryClient.invalidateQueries(['users']);
    },
    onError: () => {
      toast.error('Failed to promote user', {
        position: "top-center",
        theme: "dark"
      });
    }
  });

  const handleMakeAdmin = (email, name) => {
    if (window.confirm(`Are you sure you want to promote ${name} to admin?`)) {
      makeAdminMutation.mutate(email);
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700';
      case 'teacher': return 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700';
      case 'student': return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin': return '⚙️';
      case 'teacher': return '👨‍🏫';
      case 'student': return '🎓';
      default: return '👤';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">User Management</h2>
        <p className="text-gray-600">Manage user roles and permissions across the platform</p>
      </div>

      {/* Filters */}
      <div className="card-modern p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Users</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input
                type="text"
                placeholder="Search by name or email..."
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Role</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card-modern p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">{users.length}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
        <div className="card-modern p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {users.filter(u => u.role === 'student').length}
          </div>
          <div className="text-sm text-gray-600">Students</div>
        </div>
        <div className="card-modern p-6 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {users.filter(u => u.role === 'teacher').length}
          </div>
          <div className="text-sm text-gray-600">Teachers</div>
        </div>
        <div className="card-modern p-6 text-center">
          <div className="text-2xl font-bold text-green-600">
            {users.filter(u => u.role === 'admin').length}
          </div>
          <div className="text-sm text-gray-600">Admins</div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card-modern overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Users Found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.photoURL || `https://ui-avatars.com/api/?name=${user.name}&background=4F46E5&color=fff`}
                          alt={user.name}
                          className="w-10 h-10 rounded-full border-2 border-white shadow"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">ID: {user._id?.substring(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{user.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role || 'student')}`}>
                        <span className="mr-2">{getRoleIcon(user.role || 'student')}</span>
                        {user.role || 'student'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleMakeAdmin(user.email, user.name)}
                        disabled={user.role === 'admin'}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                          user.role === 'admin'
                            ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
                        }`}
                      >
                        {user.role === 'admin' ? 'Already Admin' : 'Make Admin'}
                      </button>
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

export default ManageUsers;