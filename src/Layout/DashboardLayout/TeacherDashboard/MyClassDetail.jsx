import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import AssignmentModal from '../../../Components/AssignmentModal';
import { ToastContainer, toast } from 'react-toastify';

const MyClassDetail = () => {
  const { id } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [assignmentCount, setAssignmentCount] = useState(0);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClassData = async () => {
    try {
      const [classRes, assignmentRes, submissionRes, assignmentsRes] = await Promise.all([
        axios.get(`https://a12-server-gamma.vercel.app/classes/${id}`),
        axios.get(`https://a12-server-gamma.vercel.app/progress/assignments/count?classId=${id}`),
        axios.get(`https://a12-server-gamma.vercel.app/progress/submissions/count?classId=${id}`),
        axios.get(`https://a12-server-gamma.vercel.app/progress/assignments/class/${id}`)
      ]);

      setClassInfo(classRes.data);
      setAssignmentCount(assignmentRes.data.count || 0);
      setSubmissionCount(submissionRes.data.count || 0);
      setAssignments(assignmentsRes.data || []);
    } catch (error) {
      console.error('Error fetching class data:', error);
      toast.error('Failed to load class data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!classInfo) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Class Not Found</h3>
        <p className="text-gray-600">The requested class could not be loaded</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{classInfo.title}</h1>
        <p className="text-gray-600">Manage class details, assignments, and student progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card-modern p-6 text-center hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-bold text-blue-600 mb-2">{classInfo.totalEnrolled || 0}</div>
          <div className="text-sm text-gray-600">Total Enrolled</div>
        </div>
        <div className="card-modern p-6 text-center hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-bold text-amber-600 mb-2">{assignmentCount}</div>
          <div className="text-sm text-gray-600">Total Assignments</div>
        </div>
        <div className="card-modern p-6 text-center hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-bold text-purple-600 mb-2">{submissionCount}</div>
          <div className="text-sm text-gray-600">Total Submissions</div>
        </div>
        <div className="card-modern p-6 text-center hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-bold text-green-600 mb-2">${classInfo.price}</div>
          <div className="text-sm text-gray-600">Price</div>
        </div>
      </div>

      {/* Class Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="card-modern p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Class Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-600">{classInfo.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    classInfo.status === 'approved' 
                      ? 'bg-green-100 text-green-700'
                      : classInfo.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {classInfo.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <p className="text-gray-600">{classInfo.category || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card-modern p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Create Assignment
              </button>
              
            </div>
          </div>
        </div>
      </div>

      {/* Assignments List */}
      <div className="card-modern p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Assignments</h3>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {assignments.length} total
          </span>
        </div>

        {assignments.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <p className="text-gray-600 mb-4">No assignments created yet</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-200"
            >
              Create First Assignment
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Submissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {assignments.map((assignment) => (
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
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {assignment.submissions || 0} submitted
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium text-sm hover:opacity-90 transition-all duration-200">
                        View Submissions
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Assignment Modal */}
      <AssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        classId={id}
        onSuccess={fetchClassData}
      />

      <ToastContainer />
    </div>
  );
};

export default MyClassDetail;