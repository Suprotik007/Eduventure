import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Stats = () => {
  const { data = {}, isLoading } = useQuery({
    queryKey: ['site-stats'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/stats`);
      return res.data;
    },
  });

  const { users = 0, classes = 0, totalEnrollments = 0, instructors = 0 } = data;

  const stats = [
    {
      label: 'Active Learners',
      value: users.toLocaleString(),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
        </svg>
      ),
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      text: 'Join our community of passionate learners',
    },
    {
      label: 'Expert Classes',
      value: classes.toLocaleString(),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      ),
      color: 'from-green-500 to-emerald-500',
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-500',
      text: 'Industry-leading courses from experts',
    },
    {
      label: 'Enrollments',
      value: totalEnrollments.toLocaleString(),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
      text: 'Successful learning journeys completed',
    },
    {
      label: 'Expert Instructors',
      value: instructors.toLocaleString(),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      ),
      color: 'from-amber-500 to-orange-500',
      gradient: 'bg-gradient-to-br from-amber-500 to-orange-500',
      text: 'Industry professionals guiding you',
    },
  ];

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of learners transforming their skills with EduVenture
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 ${stat.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative p-8 text-center">
                {/* Icon Container */}
                <div className={`w-20 h-20 ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    {stat.icon}
                  </div>
                </div>

                {/* Number */}
                <div className="relative">
                  <div className="text-5xl sm:text-6xl font-bold text-gray-900 mb-2 relative z-10">
                    {stat.value}
                  </div>
                  {/* Animated underline */}
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 ${stat.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{stat.label}</h3>
                
                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {stat.text}
                </p>

                {/* Animated border on hover */}
                <div className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-white/20 transition-all duration-500"></div>
              </div>

              {/* Floating particles */}
              <div className="absolute top-4 right-4">
                <div className={`w-3 h-3 ${stat.gradient} rounded-full opacity-0 group-hover:opacity-100 animate-ping`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="inline-block p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl animate-float">
            <div className="bg-white rounded-xl px-8 py-4">
              <p className="text-lg font-semibold text-gray-900">
                Start your learning journey today
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;