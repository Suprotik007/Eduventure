import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const MyClassDetail = () => {
  const { id } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [assignmentCount, setAssignmentCount] = useState(0);
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    // Get class info (includes totalEnrolled)
    axios.get(`http://localhost:5000/classes/${id}`).then(res => {
      setClassInfo(res.data);
    });

    // Get total assignments for this class
    axios.get(`http://localhost:5000/assignments/count?classId=${id}`).then(res => {
      setAssignmentCount(res.data.count);
    });

    // Get total submissions for this class
    axios.get(`http://localhost:5000/submissions/count?classId=${id}`).then(res => {
      setSubmissionCount(res.data.count);
    });
  }, [id]);

  if (!classInfo) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">{classInfo.title} - Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-black p-6 rounded-lg shadow text-center">
          <h3 className="text-xl text-blue-600 font-semibold">Total Enrolled</h3>
          <p className="text-4xl font-bold text-blue-600">{classInfo.totalEnrolled}</p>
        </div>
        <div className="bg-black p-6 rounded-lg shadow text-center">
          <h3 className="text-xl text-amber-400 font-semibold">Total Assignments</h3>
          <p className="text-4xl font-bold text-amber-400 ">{assignmentCount}</p>
        </div>
        <div className="bg-black p-6 rounded-lg shadow text-center">
          <h3 className="text-xl text-purple-400 font-semibold">Total Submissions</h3>
          <p className="text-4xl font-bold text-purple-400">{submissionCount}</p>
        </div>
      </div>

      
      
    </div>
  );
};

export default MyClassDetail;
