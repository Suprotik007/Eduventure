import React, { useEffect, useState, createContext } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import axios from 'axios';
import { app } from '../../Firebase';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem('access-token');
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser?.email) {
        try {
          const idToken = await currentUser.getIdToken();

          const jwtResponse = await axios.post(`${import.meta.env.VITE_API_URL}/auth`, {
            idToken,
          });

          const token = jwtResponse.data.token;
          localStorage.setItem('access-token', token);
// console.log(localStorage.getItem('access-token'));

          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/${encodeURIComponent(currentUser.email)}`
          );

        
          if (!res.data || !res.data.name || !res.data.photoURL) {
            const userData = {
              name: currentUser.displayName || res.data?.name || "New User",
              email: currentUser.email,
              photoURL: currentUser.photoURL || res.data?.photoURL || null,
              role: res.data?.role || "student",
            };

            await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData);
          }

          setRole(res.data?.role || "student");
        } catch (err) {
          console.error("User sync error:", err);
        }
      } else {
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    logOut,
    signIn,
    loading,
    setLoading,
    updateUser,
    role,
    setRole,
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
