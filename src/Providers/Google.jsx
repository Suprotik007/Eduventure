import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { use } from 'react';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from './AuthProvider';



const Google = () => {
    const {createUser,setUser,updateUser}=use(AuthContext)
    const provider= new GoogleAuthProvider
    const navigate=useNavigate()
    const handleGoogleReg=()=>{
        // e.preventDefault()
        // console.log('google')
        signInWithPopup(auth,provider)
        .then(result=>{
            // console.log(result);
            navigate('/')
        })
        .catch(error=>{
            // console.log(error);
            
        })
        createUser(email,password)
        .then(result=>{
          const user=result.user
          updateUser({displayName:name,photoURL:photo})
          .then(()=>{
            setUser({...user});
            navigate('/')
          })
          .catch((error)=>{
            // console.log(error);
            setUser(user)
            
          })
          toast.success('Registration successful')})}
        
    return (
        <div className=' '>
            <button  onClick={handleGoogleReg} className="btn bg-black text-white w-full max-w-sm shrink-0  ">
 
 Register with Google
</button> <ToastContainer />
        </div>
    );
};

export default Google;