import React, { useEffect, useState } from 'react';
import BooksCard from '../Elements/BooksCard';
import BooksSlider from '../Elements/BookSlider';

const BooksSection = () => {
    const [books,setBooks]=useState([])
    useEffect(()=>{
        fetch('books.json')
        .then(res=>res.json())
        .then(data=>setBooks(data))
    },[])
    return (
        <div className=' mx-auto '>
                        <h1 className='text-4xl font-semibold text-center mb-15 mt-20 '>Recommended books by our tutors</h1>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  '>
                           
                              <BooksSlider books={books} />
                        </div>
        </div>
    );
};

export default BooksSection;