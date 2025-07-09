import React from 'react';
import Banner from '../Components/Banner';
import Partners from '../Components/Partners';
import StartTeaching from '../Components/startTeaching';
import BooksSection from '../Components/BooksSection';
import Events from '../Components/Events';

const Home = () => {
    return (
        <div className='space-y-12 w-11/12 mx-auto'>
            <Banner></Banner>
            <Partners></Partners>
            <StartTeaching></StartTeaching>
            <BooksSection></BooksSection>
            <Events></Events>
        </div>
    );
};

export default Home;