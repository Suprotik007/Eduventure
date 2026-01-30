import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router';

const fetchClasses = async () => {
  const res = await axios.get('https://a12-server-gamma.vercel.app/allClasses');
  return res.data;
};

const AllClassCard = () => {
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ['approvedClasses'],
    queryFn: fetchClasses
  });

  if (isLoading) return (
    <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl blur-sm"></div>
          <div className="relative h-[500px] bg-white rounded-2xl p-1 animate-pulse">
            <div className="h-56 bg-gray-200 rounded-t-xl"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-6 w-3/4"></div>
              <div className="flex items-center justify-between">
                <div className="h-10 bg-gray-200 rounded w-32"></div>
                <div className="h-10 bg-gray-200 rounded w-10"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Function to generate gradient based on enrollment count
  const getCardGradient = (enrolledCount) => {
    if (enrolledCount >= 6) return "from-red-400 via-red-500 to-orange-500"; // Popular
    if (enrolledCount >= 3) return "from-green-400 via-green-500 to-emerald-500"; // Growing
    if (enrolledCount >= 2) return "from-blue-400 via-blue-500 to-cyan-500"; // Steady
    return "from-purple-400 via-purple-500 to-pink-500"; // New
  };

  const getCardBg = (enrolledCount) => {
    if (enrolledCount >= 6) return "bg-gradient-to-br from-red-50/90 via-white to-orange-50/90";
    if (enrolledCount >= 3) return "bg-gradient-to-br from-green-50/90 via-white to-emerald-50/90";
    if (enrolledCount >= 2) return "bg-gradient-to-br from-blue-50/90 via-white to-cyan-50/90";
    return "bg-gradient-to-br from-purple-50/90 via-white to-pink-50/90";
  };

  // Calculate totals for stats
  const totalEnrollments = classes.reduce((sum, cls) => sum + (cls.totalEnrolled || 0), 0);
  const averageEnrollment = classes.length > 0 ? Math.round(totalEnrollments / classes.length) : 0;
  const popularClassesCount = classes.filter(cls => (cls.totalEnrolled || 0) >= 5).length;

  return (
    <div className="px-4">
      <div className="max-w-7xl mx-auto">
        {/* Dynamic Stats Bar */}
        <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {classes.length}
            </div>
            <div className="text-gray-600 mt-2 font-medium">Available Courses</div>
            <div className="text-xs text-gray-400 mt-1">
              {classes.filter(c => c.status === 'approved').length} active
            </div>
          </div>
          
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {totalEnrollments}+
            </div>
            <div className="text-gray-600 mt-2 font-medium">Total Enrollments</div>
            <div className="text-xs text-gray-400 mt-1">
              Avg: {averageEnrollment} per course
            </div>
          </div>
          
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {popularClassesCount}
            </div>
            <div className="text-gray-600 mt-2 font-medium">Popular Courses</div>
            <div className="text-xs text-gray-400 mt-1">
              5+ enrollments each
            </div>
          </div>
          
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              4
            </div>
            <div className="text-gray-600 mt-2 font-medium">Categories</div>
            <div className="text-xs text-gray-400 mt-1">
              Diverse topics
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((cls) => {
            const enrolledCount = cls.totalEnrolled || 0;
            const gradient = getCardGradient(enrolledCount);
            const bg = getCardBg(enrolledCount);
            
            return (
              <div key={cls._id} className="relative group">
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-40 group-hover:opacity-60 transition-all duration-700 -z-10`}></div>
                
                {/* Main Card */}
                <div className={`relative ${bg} rounded-2xl border-2 border-gray-300 backdrop-blur-sm shadow-lg overflow-hidden group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-3`}>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/20 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                  {/* Image Container */}
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={cls.image}
                      alt={cls.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`relative px-4 py-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg`}>
                        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl blur opacity-30`}></div>
                        <span className="relative text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          ${cls.price}
                        </span>
                      </div>
                    </div>

                    {/* Popular Badge */}
                    {enrolledCount >= 20 && (
                      <div className="absolute top-4 left-4">
                        <div className="relative px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-xs font-bold shadow-lg">
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur opacity-50"></div>
                          <span className="relative flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                            Popular
                          </span>
                        </div>
                      </div>
                    )}

                 
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-md">
                          <img
                            src={`https://ui-avatars.com/api/?name=${cls.teacherName || 'Instructor'}&background=4F46E5&color=fff&bold=true`}
                            alt={cls.teacherName || 'Instructor'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{cls.teacherName || 'Expert Instructor'}</p>
                          <p className="text-xs text-gray-500">Instructor</p>
                        </div>
                      </div>
                      
                      {/* Enrollment Status */}
                      <div className="text-right">
                        <div className={`text-sm font-bold ${
                          enrolledCount >= 50 ? 'text-red-600' :
                          enrolledCount >= 20 ? 'text-green-600' :
                          enrolledCount >= 10 ? 'text-blue-600' : 'text-purple-600'
                        }`}>
                          {enrolledCount} enrolled
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {enrolledCount >= 6 ? 'Very Popular' :
                           enrolledCount >= 4 ? 'Growing Fast' :
                           enrolledCount >= 3 ? 'Steady Growth' : 'New Course'}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                      {cls.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                      {cls.description}
                    </p>

                    {/* Progress Bar for Enrollment */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">Course Progress</span>
                        <span className="text-xs font-medium text-gray-700">
                          {Math.min(Math.round((enrolledCount / 100) * 100), 100)}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-700`}
                          style={{ width: `${Math.min((enrolledCount / 100) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Dynamic Button Text */}
                    <Link 
                      to={`/classDtl/${cls._id}`}
                      className={`block w-full px-6 py-3.5 bg-gradient-to-r ${gradient} text-white rounded-xl text-sm font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 group/btn`}
                    >
                      <svg className="w-4 h-4 transform group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                      <span>
                        {enrolledCount >= 6 ? 'Join Popular Course' :
                         enrolledCount >= 4 ? 'Enroll Now (Hot)' :
                         enrolledCount >= 2 ? 'Start Learning' : 'Be First to Enroll'}
                      </span>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping opacity-75"></div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {classes.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Classes Available</h3>
            <p className="text-gray-600 text-lg">Check back soon for new courses!</p>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default AllClassCard;