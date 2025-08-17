import React, { useEffect, useState } from 'react';
import BooksCard from '../Elements/BooksCard';
import BooksSlider from '../Elements/BookSlider';

const BooksSection = () => {
    const [books,setBooks]=useState([])
    useEffect(()=>{
        fetch('/src/assets/books.json')
        .then(res=>res.json())
        .then(data=>setBooks(data))
    },[])
    return (
        <div className=' mx-auto '>
                        <h1 className='text-3xl font-semibold text-center  mt-18 '>Recommended books by our tutors</h1>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:max-w-10/12 mx-auto  '>
                        
                              <BooksSlider books={books} />
                        </div>
        </div>
    );
};

export default BooksSection;