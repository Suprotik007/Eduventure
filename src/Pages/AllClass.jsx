import React from 'react';
import AllClassCard from '../Elements/AllClassCard';

const AllClass = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <h1 className='text-4xl mb-15 font-semibold text-center '>Our Classes</h1>

            <div>
                <AllClassCard></AllClassCard>
            </div>
        </div>
    );
};

export default AllClass;