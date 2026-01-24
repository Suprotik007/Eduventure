import React from 'react';
import Banner from '../Components/Banner';
import Partners from '../Components/Partners';
import StartTeaching from '../Components/startTeaching';
import BooksSection from '../Components/BooksSection';
import Events from '../Components/Events';
import TopClasses from '../Components/TopClasses';
import Stats from '../Components/Stats';
import Feedbacks from '../Components/Feedbacks';

const Home = () => {
    return (
        <div className="space-y-32">
            {/* Hero Section */}
            <section className="pt-24">
                <Banner />
            </section>

            {/* Partners */}
            <section className="px-4">
                <Partners />
            </section>

            {/* Top Classes */}
            <section className="px-4">
                <div className="max-w-7xl mx-auto">
                    <TopClasses />
                </div>
            </section>

            {/* Stats */}
            <section className="px-4">
                <Stats />
            </section>

            {/* Feedback */}
            <section className="px-4">
                <div className="max-w-7xl mx-auto">
                    <Feedbacks />
                </div>
            </section>

            {/* Start Teaching */}
            <section className="px-4">
                <StartTeaching />
            </section>

            {/* Books */}
            <section className="px-4">
                <BooksSection />
            </section>

            {/* Events */}
            <section className="px-4 pb-20">
                <Events />
            </section>
        </div>
    );
};

export default Home;