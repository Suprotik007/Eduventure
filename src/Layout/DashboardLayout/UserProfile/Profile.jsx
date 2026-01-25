import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const Profile = () => {
  const { user, role } = useContext(AuthContext);

  const getRoleColor = (roleName) => {
    switch(roleName) {
      case 'student': return 'from-blue-500 to-cyan-500';
      case 'teacher': return 'from-purple-500 to-pink-500';
      case 'admin': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRoleIcon = (roleName) => {
    switch(roleName) {
      case 'student': return '🎓';
      case 'teacher': return '👨‍🏫';
      case 'admin': return '⚙️';
      default: return '👤';
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="card-modern p-8 text-center">
              {/* Profile Image */}
              <div className="relative inline-block mb-6">
                <img
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=4F46E5&color=fff&size=256`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-2xl"
                />
                <div className="absolute bottom-2 right-2">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getRoleColor(role)} flex items-center justify-center border-2 border-white`}>
                    <span className="text-white text-sm">{getRoleIcon(role)}</span>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {user?.displayName || 'No Name Provided'}
              </h2>
              
              <div className="mb-6">
                <span className={`inline-block px-4 py-1 bg-gradient-to-r ${getRoleColor(role)} text-white rounded-full text-sm font-medium capitalize`}>
                  {role || 'Not Assigned'}
                </span>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium text-gray-900">
                    {user?.metadata?.creationTime 
                      ? new Date(user.metadata.creationTime).toLocaleDateString()
                      : 'N/A'
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Last Login</span>
                  <span className="font-medium text-gray-900">
                    {user?.metadata?.lastSignInTime 
                      ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                      : 'Today'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            <div className="card-modern p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h3>
              
              <div className="space-y-6">
                {/* Email Section */}
                <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">Email Address</h4>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      Verified
                    </span>
                  </div>
                  <p className="text-gray-700">{user?.email}</p>
                </div>

                {/* Account Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border border-gray-200 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-3">Account Type</h4>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getRoleColor(role)} flex items-center justify-center`}>
                        <span className="text-white">{getRoleIcon(role)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 capitalize">{role}</p>
                        <p className="text-sm text-gray-600">
                          {role === 'student' ? 'Learning access' : 
                           role === 'teacher' ? 'Teaching access' : 
                           'Administrative access'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border border-gray-200 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-3">Account Status</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-gray-900">Active</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Your account is active and ready to use</p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-4">Additional Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">User ID</span>
                      <code className="text-sm bg-white px-2 py-1 rounded font-mono">
                        {user?.uid?.substring(0, 8)}...
                      </code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Provider</span>
                      <span className="font-medium text-gray-900">
                        {user?.providerData?.[0]?.providerId || 'Email/Password'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Account Actions</h4>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300">
                      Edit Profile
                    </button>
                    <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300">
                      Change Password
                    </button>
                    <button className="px-6 py-3 border-2 border-red-300 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-all duration-300">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;