import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import useAuth from '../../../Providers/useAuth';

const MyEnrolledClass = () => {
  const { user } = useAuth();
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

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

  const filteredClasses = enrolledClasses.filter(cls => {
    const matchesSearch = search === '' || 
      cls.title.toLowerCase().includes(search.toLowerCase()) ||
      cls.teacherName.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = filter === 'all' || true; // Add filter logic if needed
    
    return matchesSearch && matchesFilter;
  });

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-green-500 to-emerald-500';
    if (progress >= 50) return 'from-blue-500 to-cyan-500';
    if (progress >= 20) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  if (loading) {
    return (
      <div className="flex  items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Enrolled Classes</h1>
        <p className="text-gray-600">Continue your learning journey</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card-modern p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">{enrolledClasses.length}</div>
          <div className="text-sm text-gray-600">Total Enrolled</div>
        </div>
        <div className="card-modern p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {enrolledClasses.filter(c => c.completed).length}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="card-modern p-6 text-center">
          <div className="text-2xl font-bold text-amber-600">
            {enrolledClasses.filter(c => !c.completed).length}
          </div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="card-modern p-6 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(enrolledClasses.reduce((sum, c) => sum + (c.progress || 0), 0) / enrolledClasses.length)}%
          </div>
          <div className="text-sm text-gray-600">Avg Progress</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card-modern p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Classes</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input
                type="text"
                placeholder="Search by class name or instructor..."
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Classes</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="not-started">Not Started</option>
            </select>
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      {filteredClasses.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Classes Found</h3>
          <p className="text-gray-600 mb-6">
            {search ? 'Try adjusting your search' : 'You haven’t enrolled in any classes yet'}
          </p>
          <Link to="/allClass">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300">
              Browse Classes
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((classItem) => (
            <div key={classItem._id} className="card-modern overflow-hidden hover:-translate-y-2 transition-all duration-500">
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={classItem.image}
                  alt={classItem.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-gray-800">
                    ${classItem.price}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm text-white">
                    {classItem.completed ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 border-t">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{classItem.title}</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={`https://ui-avatars.com/api/?name=${classItem.teacherName}&background=4F46E5&color=fff`}
                      alt={classItem.teacherName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-600">{classItem.teacherName}</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">{classItem.progress || 0}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getProgressColor(classItem.progress || 0)} rounded-full transition-all duration-500`}
                      style={{ width: `${classItem.progress || 0}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Button */}
                <Link to={`/dashboard/my-enroll-class/${classItem._id}`}>
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Continue Learning
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrolledClass;