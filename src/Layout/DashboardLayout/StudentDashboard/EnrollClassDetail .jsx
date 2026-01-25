import React, { useState, useContext } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import { AuthContext } from '../../../Providers/AuthProvider';

Modal.setAppElement('#root');

const EnrollClassDetail = () => {
  const { id: classId } = useParams();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [submissionTexts, setSubmissionTexts] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);

  const { data: assignments = [], isPending } = useQuery({
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
        studentName: user.displayName,
      });
    },
    onSuccess: () => {
      toast.success('Assignment submitted successfully!', {
        position: "top-center",
        theme: "dark"
      });
      queryClient.invalidateQueries(['assignments', classId]);
    },
    onError: () => toast.error('Failed to submit assignment'),
  });

  const submitFeedback = useMutation({
    mutationFn: async () => {
      await axios.post(`${import.meta.env.VITE_API_URL}/progress/feedbacks`, {
        classId,
        student: user.displayName,
        email: user.email,
        userImage: user.photoURL,
        feedback: feedbackText,
        rating,
        submittedAt: new Date().toISOString()
      });
    },
    onSuccess: () => {
      toast.success('Feedback submitted successfully!', {
        position: "top-center",
        theme: "dark"
      });
      setIsModalOpen(false);
      setFeedbackText('');
      setRating(0);
    },
    onError: () => toast.error('Failed to submit feedback'),
  });

  const handleSubmit = (assignmentId, title) => {
    const submissionText = submissionTexts[assignmentId];
    if (!submissionText?.trim()) {
      toast.error('Please write your submission before submitting');
      return;
    }

    submitAssignment.mutate({ assignmentId, submissionText });
    setSubmissionTexts(prev => ({ ...prev, [assignmentId]: '' }));
  };

  const handleFeedbackSubmit = () => {
    if (!feedbackText.trim()) {
      toast.error('Please write your feedback');
      return;
    }
    if (rating === 0) {
      toast.error('Please provide a rating');
      return;
    }

    submitFeedback.mutate();
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Class Assignments</h2>
        <p className="text-gray-600">Complete your assignments and track your progress</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card-modern p-6 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-2">{assignments.length}</div>
          <div className="text-sm text-gray-600">Total Assignments</div>
        </div>
        <div className="card-modern p-6 text-center">
          <div className="text-2xl font-bold text-amber-600 mb-2">
            {assignments.filter(a => a.submissions?.some(s => s.studentEmail === user.email)).length}
          </div>
          <div className="text-sm text-gray-600">Submitted</div>
        </div>
        <div className="card-modern p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">
            {assignments.filter(a => a.submissions?.some(s => s.studentEmail === user.email && s.graded)).length}
          </div>
          <div className="text-sm text-gray-600">Graded</div>
        </div>
      </div>

      {/* Assignments Table */}
      <div className="card-modern overflow-hidden">
        {assignments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Assignments</h3>
            <p className="text-gray-600">No assignments have been created for this class yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Assignment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Submission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {assignments.map((assignment) => {
                  const userSubmission = assignment.submissions?.find(s => s.studentEmail === user.email);
                  const isSubmitted = !!userSubmission;
                  const isGraded = userSubmission?.graded;

                  return (
                    <tr key={assignment._id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{assignment.title}</p>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{assignment.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">
                          {new Date(assignment.deadline).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          isGraded ? 'bg-green-100 text-green-700' :
                          isSubmitted ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {isGraded ? 'Graded' : isSubmitted ? 'Submitted' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <textarea
                          value={submissionTexts[assignment._id] || ''}
                          onChange={(e) =>
                            setSubmissionTexts(prev => ({
                              ...prev,
                              [assignment._id]: e.target.value,
                            }))
                          }
                          disabled={isSubmitted}
                          placeholder={isSubmitted ? "Already submitted" : "Type your answer here..."}
                          className={`w-full px-3 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                            isSubmitted ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''
                          }`}
                          rows="3"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleSubmit(assignment._id, assignment.title)}
                          disabled={isSubmitted || !submissionTexts[assignment._id]?.trim()}
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                            isSubmitted
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : !submissionTexts[assignment._id]?.trim()
                              ? 'bg-gray-100 text-gray-400'
                              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
                          }`}
                        >
                          {isSubmitted ? 'Submitted' : 'Submit'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Feedback Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Submit Course Feedback
        </button>
      </div>

      {/* Feedback Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Course Feedback"
        className="bg-white rounded-2xl p-8 max-w-lg mx-auto mt-20 outline-none shadow-2xl"
        overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Course Feedback</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-2xl focus:outline-none"
                >
                  {star <= rating ? '★' : '☆'}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">{rating}/5 stars</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Feedback
            </label>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Share your experience with this course..."
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleFeedbackSubmit}
              disabled={!feedbackText.trim() || rating === 0}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default EnrollClassDetail;