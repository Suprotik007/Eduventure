import React from 'react';
import AllClassCard from '../Elements/AllClassCard';

const AllClass = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/30 via-white to-purple-50/30 py-12">
            <div className='w-11/12 mx-auto'>
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full mb-6 shadow-lg">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Browse All Courses
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                        Explore Our Classes
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Handpicked courses from industry experts designed to elevate your skills and transform your career
                    </p>
                </div>

                <div>
                    <AllClassCard />
                </div>
            </div>
        </div>
    );
};

export default AllClass;