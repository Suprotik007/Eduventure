import React, { useContext } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from './AuthProvider';

const Google = () => {
  const { setUser } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleGoogleReg = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

  const userInfo = {
  name: user.displayName,
  email: user.email,
  photoURL: user.photoURL
};


    const res = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });

      setUser(user);
      toast.success('Google login successful');
      navigate('/dashboard');

    } catch (error) {
      console.error('Google sign-in error:', error);
      toast.error('Google login failed');
    }
  };

  return (
    <div>
      <button onClick={handleGoogleReg} className="btn bg-black text-white w-full max-w-sm">
        Register with Google
      </button>
      <ToastContainer />
    </div>
  );
};

export default Google;
