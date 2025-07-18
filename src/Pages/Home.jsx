import React from 'react';
import Banner from '../Components/Banner';
import Partners from '../Components/Partners';
import StartTeaching from '../Components/startTeaching';
import BooksSection from '../Components/BooksSection';
import Events from '../Components/Events';
import TopClasses from '../Components/TopClasses';
import Stats from '../Components/Stats';

const Home = () => {
    return (
        <div className='space-y-8 w-11/12 mx-auto'>
            <Banner></Banner>
            <Partners></Partners>
            <TopClasses></TopClasses>
            <Stats></Stats>
            <StartTeaching></StartTeaching>
            <BooksSection></BooksSection>
            <Events></Events>
        </div>
    );
};

export default Home;