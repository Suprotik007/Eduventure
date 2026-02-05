import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const queryClient = useQueryClient();

  // Fetch users with search and filter
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', search, selectedRole],
    queryFn: async () => {
      const res = await axios.get('https://a12-server-gamma.vercel.app/users');
      let filteredUsers = res.data;
      
      // Apply search filter
      if (search) {
        const searchLower = search.toLowerCase();
        filteredUsers = filteredUsers.filter(user =>
          user.name?.toLowerCase().includes(searchLower) ||
          user.email?.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply role filter
      if (selectedRole !== "all") {
        filteredUsers = filteredUsers.filter(user => 
          user.role === selectedRole
        );
      }
      
      return filteredUsers;
    }
  });

  const makeAdminMutation = useMutation({
    mutationFn: async (email) => {
      return await axios.patch(`https://a12-server-gamma.vercel.app/users/make-admin/${email}`);
    },
    onSuccess: () => {
      toast.success(' User promoted to admin successfully!', {
        position: "top-right",
        theme: "colored",
        className: "bg-gradient-to-r from-emerald-500 to-teal-600"
      });
      queryClient.invalidateQueries(['users']);
    },
    onError: () => {
      toast.error('❌ Failed to promote user', {
        position: "top-right",
        theme: "colored"
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
      case 'admin': return 'bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 border border-emerald-200';
      case 'teacher': return 'bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 border border-purple-200';
      case 'student': return 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin': return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      );
      case 'teacher': return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      );
      case 'student': return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
      );
      default: return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      );
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              User Management
            </h1>
            <p className="text-slate-500 text-lg">Manage user roles and permissions</p>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">{users.length} Active Users</span>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Search Users</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name or email..."
                className="block w-full pl-10 pr-4 py-2.5 sm:py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Filter by Role</label>
            <div className="relative">
              <select
                className="block w-full pl-4 pr-10 py-2.5 sm:py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admins</option>
                <option value="teacher">Teachers</option>
                <option value="student">Students</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900">{users.length}</div>
              <div className="text-xs sm:text-sm text-slate-500"> Users</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-blue-700">
                {users.filter(u => u.role === 'student').length}
              </div>
              <div className="text-xs sm:text-sm text-slate-500">Students</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-purple-700">
                {users.filter(u => u.role === 'teacher').length}
              </div>
              <div className="text-xs sm:text-sm text-slate-500">Teachers</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-700">
                {users.filter(u => u.role === 'admin').length}
              </div>
              <div className="text-xs sm:text-sm text-slate-500">Admins</div>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-br from-slate-50 to-blue-50/30">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-slate-600 font-medium">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="bg-gradient-to-br from-white to-slate-50 p-8 sm:p-12 text-center border-t border-slate-100">
            <div className="w-28 h-28 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-16 h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
              {search || selectedRole !== 'all' ? 'No matching users found' : 'No users yet'}
            </h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              {search || selectedRole !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Users will appear here once they register on the platform'}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden border-2 border-slate-300">
            <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100/30 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-900">
                  Users <span className="text-slate-500">({users.length})</span>
                </h3>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full"></span>
                    <span>Admin</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-purple-400 rounded-full"></span>
                    <span>Teacher</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-blue-400 rounded-full"></span>
                    <span>Student</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto border-t border-slate-300">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100/30">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr key={user._id} className="group hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-blue-50/30 transition-all duration-300">
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-lg">
                              <img
                                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff&bold=true`}
                                alt={user.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full border-2 border-white shadow flex items-center justify-center">
                              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{user.name}</p>
                            <p className="text-xs text-slate-500">ID: {user._id?.substring(0, 6)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm text-slate-900 font-medium">{user.email}</p>
                          {user.createdAt && (
                            <p className="text-xs text-slate-500">
                              Joined: {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex items-center justify-center sm:justify-start px-3 py-1.5 rounded-full text-xs font-semibold ${getRoleColor(user.role || 'student')}`}>
                            <span className="mr-2">{getRoleIcon(user.role || 'student')}</span>
                            <span className="capitalize">{user.role || 'student'}</span>
                          </span>
                          {user.role === 'admin' && (
                            <div className="flex items-center gap-1 text-xs text-emerald-600">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span>Full access</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <button
                          onClick={() => handleMakeAdmin(user.email, user.name)}
                          disabled={user.role === 'admin'}
                          className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 min-w-[120px] ${
                            user.role === 'admin'
                              ? 'bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 border border-emerald-200 cursor-not-allowed'
                              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0'
                          }`}
                        >
                          {user.role === 'admin' ? (
                            <>
                             
                              Already Admin
                            </>
                          ) : (
                            <>
                             
                              {makeAdminMutation.isLoading && makeAdminMutation.variables === user.email ? 'Promoting...' : 'Make Admin'}
                            </>
                          )}
                        </button>
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
      {users.length > 0 && (
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
                  <span className="font-semibold">Note:</span> Admins have full access to all platform features including user management, content moderation, and analytics. Promote users with caution.
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

export default ManageUsers;