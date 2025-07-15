import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import AssignmentModal from '../../../Components/AssignmentModal';
import { ToastContainer } from 'react-toastify';

const MyClassDetail = () => {
  const { id } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [assignmentCount, setAssignmentCount] = useState(0);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchClassData = async () => {
    try {
      const classRes = await axios.get(`http://localhost:5000/classes/${id}`);
      setClassInfo(classRes.data);

      const assignmentRes = await axios.get(`http://localhost:5000/progress/assignments/count?classId=${id}`);
      setAssignmentCount(assignmentRes.data.count);

      const submissionRes = await axios.get(`http://localhost:5000/progress/submissions/count?classId=${id}`);
      setSubmissionCount(submissionRes.data.count);
    } catch (error) {
      console.error('Error fetching class data:', error);
    }
  };

  useEffect(() => {
    fetchClassData();
  }, [id]);

  if (!classInfo) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">{classInfo.title} - Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-black p-6 rounded-lg shadow text-center">
          <h3 className="text-xl text-green-400 font-semibold">Total Enrolled</h3>
          <p className="text-4xl font-bold text-green-400">{classInfo.totalEnrolled}</p>
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

      <div className="text-center mt-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          Create Assignment
        </button>
      </div>

      <AssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        classId={id}
        onSuccess={fetchClassData}
        
      />
         <ToastContainer></ToastContainer>
    </div>
  );
};

export default MyClassDetail;
