import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router';
import useAuth from '../../../Providers/useAuth';

const MyEnrolledClass = () => {
  const { user } = useAuth();
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchEnrolled = async () => {
      try {
        const res = await axios.get(`https://a12-server-gamma.vercel.app/enrollments?email=${user.email}`);
        setEnrolledClasses(res.data);
      } catch (error) {
        console.error('Failed to fetch enrolled classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolled();
  }, [user]);

  if (loading) return <div className="text-center mt-20">Loading enrolled classes...</div>;

  return (
    <div className="w-50 md:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {enrolledClasses.map((classItem) => (
        <div key={classItem._id} className="bg-black shadow-md rounded-xl overflow-hidden">
          <img src={classItem.image} alt={classItem.title} className="w-full p-3 rounded-2xl h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-lg text-amber-400 font-bold">{classItem.title}</h2>
            <p className="text-sm text-white font-semibold mb-3">Instructor: <span className=' text-accent'>{classItem.teacherName}</span></p>
            <Link 
              to={`/dashboard/my-enroll-class/${classItem._id}`} 
              className="inline-block btn-primary btn text-white px-4 py-2 rounded hover:bg-teal-700"
            >
              Continue
            </Link>
          </div>
        </div>
      ))}

      {enrolledClasses.length === 0 && (
        <p className="text-center col-span-full text-gray-500 mt-10">You haven't enrolled in any classes yet.</p>
      )}
    </div>
  );
};

export default MyEnrolledClass;
