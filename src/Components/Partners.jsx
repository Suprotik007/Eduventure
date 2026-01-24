import React from 'react';
import PartnersSlider from '../Elements/PartnerDetails';

const Partners = () => {
    return (
        <div className="py-16 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 animate-fade-in-up">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Our Trusted Partners
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We're proud to collaborate with industry leaders who share our vision of transforming education through innovation and excellence.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
                </div>
                <div className="animate-slide-in-left">
                    <PartnersSlider></PartnersSlider>
                </div>
            </div>
        </div>
    );
};

export default Partners;