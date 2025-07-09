import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from '../../Firebase';

export const AuthContext=createContext()


const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const[user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
// console.log(user);

    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
const signIn=(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
}

const updateUser=(updatedData)=>{
    return updateProfile(auth.currentUser,updatedData)
}


const logOut=()=>{
    return signOut(auth)
}



    useEffect(()=>{
const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser)
    setLoading(false)
})
return()=>{
    unsubscribe()
}
    },[])
    const authData={
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        loading,
        setLoading,
        updateUser,
    }
    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
        

};

export default AuthProvider;