import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
    <div className='w-12/12 mx-auto'>
           <header className='mb-8 sticky top-0 z-50'>
             <Navbar></Navbar>
           </header>
           <main>
             <Outlet></Outlet>
           </main>
           {/* <footer className='mt-8'>
<Footer></Footer>
           </footer> */}
            
        </div>
    );
};

export default RootLayout;