import React, { useState, useContext } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
;

import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import { AuthContext } from '../../../Providers/AuthProvider';

Modal.setAppElement('#root'); 

const EnrollClassDetail = () => {
  const { id } = useParams(); 
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [submissionTexts, setSubmissionTexts] = useState({});
  
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);

  // Fetch assignments for this class
  const { data: assignments = [], isPending } = useQuery({
    queryKey: ['assignments', id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/assignments/${id}`);
      return res.data;
    },
  });

  // Handle assignment submission
  const submitAssignment = useMutation({
    mutationFn: async ({ assignmentId, submissionText }) => {
      await axios.post(`${import.meta.env.VITE_API_URL}/submissions`, {
        assignmentId,
        submissionText,
        classId: id,
        studentEmail: user.email,
      });
      await axios.patch(`${import.meta.env.VITE_API_URL}/assignments/submit/${assignmentId}`);
    },
    onSuccess: () => {
      toast.success('Assignment submitted!');
      queryClient.invalidateQueries({ queryKey: ['assignments', id] });
    },
    onError: () => toast.error('Submission failed'),
  });

  // Handle TER Feedback Submission
  const submitTER = useMutation({
    mutationFn: async () => {
      await axios.post(`${import.meta.env.VITE_API_URL}/feedbacks`, {
        classId: id,
        student: user.displayName,
        email: user.email,
        feedback: feedbackText,
        rating,
      });
    },
    onSuccess: () => {
      toast.success('Feedback submitted!');
     
      setFeedbackText('');
      setRating(0);
    },
    onError: () => toast.error('Failed to submit feedback'),
  });

  const handleSubmit = (assignmentId) => {
    const submissionText = submissionTexts[assignmentId];
    if (!submissionText) {
      toast.error('Please write your submission before submitting');
      return;
    }

    submitAssignment.mutate({ assignmentId, submissionText });
  };

  if (isPending) return <p className="text-white text-center">Loading assignments...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl text-white text-center font-bold mb-6">My Assignments</h2>

      <div className="overflow-x-auto mb-6">
        <table className="table bg-black text-white border">
          <thead className="text-amber-300">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Submission</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assign) => (
              <tr key={assign._id}>
                <td>{assign.title}</td>
                <td>{assign.description}</td>
                <td>{new Date(assign.deadline).toLocaleDateString()}</td>
                <td>
                  <textarea
                    className="textarea textarea-bordered text-black w-full"
                    value={submissionTexts[assign._id] || ''}
                    onChange={(e) =>
                      setSubmissionTexts((prev) => ({
                        ...prev,
                        [assign._id]: e.target.value,
                      }))
                    }
                    placeholder="Type your answer"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary mt-2"
                    onClick={() => handleSubmit(assign._id)}
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TER Button */}
      <div className="text-center mt-10">
        <button
          className="btn bg-blue-600 text-white"
          
        >
          Teaching Evaluation Report (TER)
        </button>
      </div>

      

      <ToastContainer />
    </div>
  );
};

export default EnrollClassDetail;
