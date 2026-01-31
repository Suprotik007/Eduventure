import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { toast } from 'react-toastify';
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from 'firebase/auth';
import { auth } from '../../../../Firebase';
import axios from 'axios';

const Profile = () => {
  const { user, role, logOut, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [deleteData, setDeleteData] = useState({
    password: '',
    confirmation: ''
  });

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

  // Handle Profile Update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(auth.currentUser, {
        displayName: formData.displayName,
        photoURL: formData.photoURL
      });

      // Update in your backend
      await axios.put(`${import.meta.env.VITE_API_URL}/users/update-profile`, {
        email: user.email,
        displayName: formData.displayName,
        photoURL: formData.photoURL
      });

      // Update context
      updateUserProfile({
        displayName: formData.displayName,
        photoURL: formData.photoURL
      });

      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Handle Password Change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(
        user.email,
        passwordData.currentPassword
      );
      
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      // Update password
      await updatePassword(auth.currentUser, passwordData.newPassword);
      
      toast.success('Password changed successfully!');
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error changing password:', error);
      
      if (error.code === 'auth/wrong-password') {
        toast.error('Current password is incorrect');
      } else if (error.code === 'auth/requires-recent-login') {
        toast.error('Please sign in again to change your password');
      } else {
        toast.error(error.message || 'Failed to change password');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Account Deletion
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    
    if (deleteData.confirmation.toLowerCase() !== 'delete') {
      toast.error('Please type "delete" to confirm');
      return;
    }

    if (!window.confirm('Are you absolutely sure? This action cannot be undone!')) {
      return;
    }

    setLoading(true);

    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(
        user.email,
        deleteData.password
      );
      
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Delete from your backend first
      await axios.delete(`${import.meta.env.VITE_API_URL}/users/delete-account`, {
        data: { email: user.email }
      });

      // Delete from Firebase
      await deleteUser(auth.currentUser);
      
      toast.success('Account deleted successfully');
      
      // Log out user
      setTimeout(() => {
        logOut();
        window.location.href = '/';
      }, 2000);
      
    } catch (error) {
      console.error('Error deleting account:', error);
      
      if (error.code === 'auth/wrong-password') {
        toast.error('Password is incorrect');
      } else if (error.code === 'auth/requires-recent-login') {
        toast.error('Please sign in again to delete your account');
      } else {
        toast.error(error.message || 'Failed to delete account');
      }
    } finally {
      setLoading(false);
      setIsDeleting(false);
      setDeleteData({
        password: '',
        confirmation: ''
      });
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
                  
                  {/* Edit Profile Modal */}
                  {isEditing && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold text-gray-900">Edit Profile</h3>
                          <button 
                            onClick={() => setIsEditing(false)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            ✕
                          </button>
                        </div>
                        
                        <form onSubmit={handleUpdateProfile}>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Display Name
                              </label>
                              <input
                                type="text"
                                value={formData.displayName}
                                onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Profile Photo URL
                              </label>
                              <input
                                type="url"
                                value={formData.photoURL}
                                onChange={(e) => setFormData({...formData, photoURL: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://example.com/photo.jpg"
                              />
                            </div>
                          </div>
                          
                          <div className="flex gap-3 mt-8">
                            <button
                              type="submit"
                              disabled={loading}
                              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsEditing(false)}
                              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Change Password Modal */}
                  {isChangingPassword && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold text-gray-900">Change Password</h3>
                          <button 
                            onClick={() => setIsChangingPassword(false)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            ✕
                          </button>
                        </div>
                        
                        <form onSubmit={handleChangePassword}>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Password
                              </label>
                              <input
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                              </label>
                              <input
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                                minLength="6"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password
                              </label>
                              <input
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="flex gap-3 mt-8">
                            <button
                              type="submit"
                              disabled={loading}
                              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {loading ? 'Changing...' : 'Change Password'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsChangingPassword(false)}
                              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Delete Account Modal */}
                  {isDeleting && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold text-gray-900">Delete Account</h3>
                          <button 
                            onClick={() => setIsDeleting(false)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            ✕
                          </button>
                        </div>
                        
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                          <div className="flex items-center space-x-2 text-red-700 mb-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.894-.833-2.664 0L4.258 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                            </svg>
                            <span className="font-semibold">Warning: This action is irreversible!</span>
                          </div>
                          <p className="text-red-600 text-sm">
                            All your data will be permanently deleted. This includes your profile, enrollments, and progress.
                          </p>
                        </div>
                        
                        <form onSubmit={handleDeleteAccount}>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Password
                              </label>
                              <input
                                type="password"
                                value={deleteData.password}
                                onChange={(e) => setDeleteData({...deleteData, password: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Type "DELETE" to confirm
                              </label>
                              <input
                                type="text"
                                value={deleteData.confirmation}
                                onChange={(e) => setDeleteData({...deleteData, confirmation: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
                                required
                                placeholder="DELETE"
                              />
                            </div>
                          </div>
                          
                          <div className="flex gap-3 mt-8">
                            <button
                              type="submit"
                              disabled={loading}
                              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {loading ? 'Deleting...' : 'Delete Account Permanently'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsDeleting(false)}
                              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300 hover:-translate-y-1"
                    >
                      Edit Profile
                    </button>
                    <button 
                      onClick={() => setIsChangingPassword(true)}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 hover:-translate-y-1"
                    >
                      Change Password
                    </button>
                    <button 
                      onClick={() => setIsDeleting(true)}
                      className="px-6 py-3 border-2 border-red-300 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-all duration-300 hover:-translate-y-1"
                    >
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