import React from 'react';
import img from '../assets/tutor.jpg'
const StartTeaching = () => {
    return (
      
          <div className=''>
 
              <div className="gap-5 flex flex-col md:flex-row w-11/12 mx-auto  justify-center items-center mb-6 md:mb-0"> 
              
              <img className='w-100 h-65 rounded-xl' src={img} ></img>

<div className="md:w-1/2 w-full md:pl-12 flex flex-col items-start"> <h2 className="text-3xl font-bold mb-4 text-gray-800"> Share Your Knowledge. Shape the Future. </h2> <p className="text-lg text-gray-900 mb-6"> Join our vibrant community of educators and make a real difference in students’ lives. Teach what you love, inspire learners worldwide, and grow your impact—all from one powerful platform. </p> <button className="btn  btn-neutral    hover:rounded-4xl btn-md text-white font-semibold rounded transition"> Start Teaching </button>  </div>
</div>
          </div>
        
    )}
export default StartTeaching;