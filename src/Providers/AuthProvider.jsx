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
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser?.email) {
        try {
          const res = await axios.get(`http://localhost:5000/users/${encodeURIComponent(currentUser.email)}`);

          if (!res.data.role) {
            await axios.patch(`http://localhost:5000/users/role/${encodeURIComponent(currentUser.email)}`, {
              role: "student",
            });
          }

          setRole(res.data.role || "student");
        } catch (err) {
          if (err.response && err.response.status === 404) {
            const newUser = {
              name: currentUser.displayName,
              email: currentUser.email,
              photoURL: currentUser.photoURL,
              role: "student",
            };
            try {
              await axios.post(`http://localhost:5000/users`, newUser);
              setRole("student");
            } catch (postErr) {
              console.error("Error creating new Google user:", postErr);
            }
          } else {
            console.error("Error fetching user role:", err);
          }
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
