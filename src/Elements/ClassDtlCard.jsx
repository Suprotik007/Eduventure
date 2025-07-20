import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router'; 

const ClassDtlCard = () => {
  const { _id } = useParams(); 
  const [classDetail, setClassDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassDetails = async () => {
    
        const response = await fetch(`https://a12-server-gamma.vercel.app/classes/${_id}`);
        const data = await response.json();
        setClassDetail(data);
    
        setLoading(false);
    
    };
    
    if (_id) {
      fetchClassDetails();
    }
  }, [_id]);

  if (loading) return <p>Loading...</p>;
  if (!classDetail) return <p>Class not found</p>;

  return (

    <div className="w-11/12 md:w-6/12 lg:w-4/12 mx-auto ">
     
       <h2 className="text-2xl text-center font-bold mb-2">Class Details</h2>
<div className='card bg-black space-y-3  text-white p-5 m-5 rounded-2xl shadow'>
      <img className='h-50' src={classDetail.image} alt="" />
      <p className='text-2xl text-gray-300 font-bold'>{classDetail.title}</p>
      
      <p className='font-semibold'>Instructor: <span className=' font-semibold badge badge-warning'>{classDetail.teacherName}</span></p>
    <p className='font-semibold'>Description: <span className='text-accent font-semibold '>{classDetail.description}</span></p>
     <p className='font-semibold'>Enrolled: <span className='badge badge-error font-semibold'>{classDetail.
totalEnrolled}</span></p>
      <p className='font-semibold'>Price: <span className='badge badge-accent font-semibold'>$ {classDetail.price}</span></p>

      <div className='py-3'>
         <Link to={`/payment/${classDetail._id}`}>
         <button className='btn  btn-primary btn-block '>Pay</button></Link>
     </div>
</div>
      
    </div>
  );
};

export default ClassDtlCard;