import React, { useState, useContext } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
;
import Rating from 'react-rating-stars-component';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import { AuthContext } from '../../../Providers/AuthProvider';

Modal.setAppElement('#root'); 

const EnrollClassDetail = () => {
  const { id:classId } = useParams(); 
 

  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [submissionTexts, setSubmissionTexts] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);

  
const { data: assignment , isPending } = useQuery({
  queryKey: ['assignments', classId],
  queryFn: async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/progress/assignments/class/${classId}`);

    return res.data;
    
  },
 
  
  enabled: !!classId,
});



 
  const submitAssignment = useMutation({
    mutationFn: async ({ assignmentId, submissionText }) => {
      await axios.post(`${import.meta.env.VITE_API_URL}/progress/assignments/submit`, {
        assignmentId,
        submissionText,
        classId,
        studentEmail: user.email,
      });
      
    },
    
    onSuccess: () => {
      toast.success('Assignment submitted!');
      setSubmissionTexts('')
      queryClient.invalidateQueries({ queryKey: ['assignments', classId] });
    },
    onError: () => toast.error('Submission failed'),
  });

  
  const submitTER = useMutation({
    mutationFn: async () => {
      await axios.post(`${import.meta.env.VITE_API_URL}/progress/feedbacks`, {
        classId,
        student: user.displayName,
        email: user.email,
        feedback: feedbackText,
        rating,
      });
    },
    onSuccess: () => {
      toast.success('Feedback submitted!');
      setIsModalOpen(false);
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
  if (!assignment) return <p>Assignment not found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl  text-center font-bold mb-6">My Assignments</h2>

      <div className="overflow-x-auto mb-6 font-semibold">
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
            {assignment.map((assign) => (
              <tr key={assign._id}>
                <td className='text-red-400'>{assign.title}</td>
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

      
      <div className="text-center mt-10">
        <button
          className="btn btn-primary text-white"
          onClick={() => setIsModalOpen(true)}
        >
          Report or Feedback
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="TER Modal"
        className="bg-white p-6 rounded-md w-[90%] max-w-lg mx-auto mt-20 outline-none shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4 text-black">Teaching Evaluation Report</h2>
        <textarea
          className="textarea textarea-bordered w-full mb-4 text-black"
          rows="4"
          placeholder="Write your feedback here"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />

        <div className="mb-4">
          <p className="text-black font-semibold mb-1">Rating:</p>
          <Rating
            count={5}
            value={rating}
            onChange={(newRating) => setRating(newRating)}
            size={24}
            activeColor="#ffd700"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            className="btn btn-error btn-outline"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={() => submitTER.mutate()}>
            Send
          </button>
        </div>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default EnrollClassDetail;
