
import React from 'react';
import Lottie from "lottie-react";
import { Link } from 'react-router';
import errorLottie from '../assets/404 error.json'
const Error = () => {
  return (
    <div>
      
      <div className='mx-4 sm:mx-8 md:mx-20 lg:mx-80    text-center'>
           <Lottie className='' animationData={errorLottie} loop={true}> </Lottie>
        <Link to='/'>
          <button className="btn  btn-outline border-3 text-gray-700 rounded-4xl hover:bg-black hover:text-white  btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
