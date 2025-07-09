import React, { useState,  use } from 'react';
import { Link, useNavigate } from 'react-router';

import { Navigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

import Lottie from "lottie-react";
import loginLottie from '../assets/lottieLogin'

import { AuthContext } from '../Providers/AuthProvider';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Firebase';



const LoginBox = () => {
  
   const provider= new GoogleAuthProvider
      const handleGoogleLogin=()=>{
          signInWithPopup(auth,provider)
          .then(result=>{  
              navigate(location.state ? location.state : '/');
          })
          .catch(error=>{
          })}
  const {signIn}=use(AuthContext)
  
  const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const handleLogin=(e)=>{
    e.preventDefault()
    const email=e.target.email.value
    const password=e.target.password.value
    
    signIn(email,password)
    .then((result)=>{
      const user=result.user
  
      toast.success('Login Successful')
      setTimeout(() => {
        navigate(location.state ? location.state : '/');
      }, 1000); 
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = 'Either Email or Password is wrong';
      toast.error(errorMessage)
    });
  }


    return (
      
        <div className=''>
            <div className="hero w-11/12 mx-auto min-h-screen">

               <div className="hero-content  flex-col lg:flex-row ">
    <div className="text-center lg:text-left">
      <h1 className="text-4xl  mb-10 font-bold text-center">Login now!</h1>
     <Lottie className='' animationData={loginLottie} loop={true}> </Lottie>
       
    </div>

    <div className="card border-2  rounded-2xl w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
      
        <form  onSubmit={handleLogin} className="fieldset">
          <label className="label font-semibold">Email</label>
          <input type="email" required name='email' className="input border-2 border-black  font-semibold" placeholder="Email"   value={email}
              onChange={(e) => setEmail(e.target.value)}/>
          <label className="label font-semibold">Password</label>
          <input type="password" required name='password' className="input text-black border-2 border-black font-semibold" placeholder="Password" />
         

        
          <button type='submit' className="btn btn-dash text-gray-500 border-black hover:border-blue-500 btn-outline border-3 rounded-4xl hover:text-blue-500 hover:bg-black mt-4">Login with Email</button><ToastContainer />
          <button onClick={handleGoogleLogin} className="btn btn-dash text-gray-500  btn-outline border-3 border-black hover:border-teal-500 rounded-4xl hover:text-teal-300 hover:bg-black ">
 
  Login with Google
</button> 

          <p className=' font-bold text-center text-gray-800 mt-3'>Don’t Have An Account ? <Link to='/reg'> <span className=' font-bold text-fuchsia-600'>Register</span></Link></p>
        </form>
      </div>
    </div>
    
  </div>
  </div>
  
</div>
    );
};

export default LoginBox;