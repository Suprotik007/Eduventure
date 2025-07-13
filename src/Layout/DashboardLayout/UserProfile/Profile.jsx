import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';


const Profile = () => {
  const { user, role } = useContext(AuthContext);

  return (
    <div className="max-w-md text-white font-semibold mx-auto mt-10 p-6 bg-black gap-10 shadow-lg rounded-lg">
      <div className="flex flex-col md:items-center">
        <img
          src={user?.photoURL || 'https://via.placeholder.com/150'}
          alt="User"
          className="w-32 h-32 rounded-full object-cover border-4 border-white"
        />
        <h2 className="text-xl text-amber-300 font-bold mt-4">{user?.displayName || 'No Name Found'}</h2>
        <p className="">Role: <span className="font-medium">{role || 'Not Assigned'}</span></p>
        <p className="">Email: {user?.email}</p>
       
      </div>
    </div>
  );
};

export default Profile;
