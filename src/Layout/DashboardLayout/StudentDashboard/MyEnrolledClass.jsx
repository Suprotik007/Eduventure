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
    
    let matchesFilter = true;
    if (filter === 'completed') matchesFilter = cls.completed;
    if (filter === 'in-progress') matchesFilter = !cls.completed && (cls.progress || 0) > 0;
    if (filter === 'not-started') matchesFilter = (cls.progress || 0) === 0;
    
    return matchesSearch && matchesFilter;
  });

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-gradient-to-r from-emerald-400 to-teal-500';
    if (progress >= 50) return 'bg-gradient-to-r from-sky-400 to-blue-500';
    if (progress >= 20) return 'bg-gradient-to-r from-amber-400 to-orange-400';
    return 'bg-gradient-to-r from-rose-400 to-pink-500';
  };

  const getStatusColor = (completed, progress) => {
    if (completed) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (progress > 0) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-amber-100 text-amber-800 border-amber-200';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-100 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-slate-600 font-medium">Loading your classes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              My Learning Journey
            </h1>
            <p className="text-slate-500 text-lg">Continue where you left off and track your progress</p>
          </div>
          <div className="flex gap-3">
            <Link to="/allClass">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5">
                Explore More
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{enrolledClasses.length}</div>
              <div className="text-sm text-slate-500">Total Enrolled</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-700">
                {enrolledClasses.filter(c => c.completed).length}
              </div>
              <div className="text-sm text-slate-500">Completed</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-sky-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700">
                {enrolledClasses.filter(c => !c.completed).length}
              </div>
              <div className="text-sm text-slate-500">In Progress</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-700">
                {enrolledClasses.length > 0 
                  ? `${Math.round(enrolledClasses.reduce((sum, c) => sum + (c.progress || 0), 0) / enrolledClasses.length)}%`
                  : '0%'
                }
              </div>
              <div className="text-sm text-slate-500">Avg Progress</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Search Classes</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by class name or instructor..."
                className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Filter by Status</label>
            <div className="relative">
              <select
                className="block w-full pl-4 pr-10 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Classes</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="not-started">Not Started</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      {filteredClasses.length === 0 ? (
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 md:p-12 text-center border border-slate-200">
          <div className="max-w-md mx-auto">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-16 h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              {search ? 'No matching classes found' : 'Start Your Learning Journey'}
            </h3>
            <p className="text-slate-500 mb-8">
              {search 
                ? 'Try different keywords or browse our catalog'
                : 'Enroll in your first class and begin your educational adventure'
              }
            </p>
            <Link to="/allClass">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1">
                Browse All Classes
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((classItem) => (
            <div 
              key={classItem._id} 
              className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:border-slate-200 transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                <img
                  src={classItem.image}
                  alt={classItem.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-sm font-bold text-slate-800 shadow-sm">
                    ${classItem.price}
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(classItem.completed, classItem.progress)}`}>
                    {classItem.completed ? 'Completed' : classItem.progress > 0 ? 'In Progress' : 'Not Started'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 min-h-[3.5rem]">
                  {classItem.title}
                </h3>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
                    <img
                      src={`https://ui-avatars.com/api/?name=${classItem.teacherName}&background=6366f1&color=fff&bold=true`}
                      alt={classItem.teacherName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{classItem.teacherName}</p>
                    <p className="text-xs text-slate-500">Instructor</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Your Progress</span>
                    <span className="font-semibold text-slate-900">{classItem.progress || 0}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${getProgressColor(classItem.progress || 0)}`}
                      style={{ width: `${classItem.progress || 0}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Button */}
                <Link to={`/dashboard/my-enroll-class/${classItem._id}`}>
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 group-hover:from-blue-700 group-hover:to-indigo-700">
                    {classItem.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                    <span className="ml-2">→</span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Note */}
      {filteredClasses.length > 0 && (
        <div className="mt-12 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-sm">
            Showing {filteredClasses.length} of {enrolledClasses.length} enrolled classes
          </p>
        </div>
      )}
    </div>
  );
};

export default MyEnrolledClass;