import React, { useEffect, useState } from 'react';
import BooksSlider from '../Elements/BookSlider';

const BooksSection = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        fetch('/books.json')
            .then(res => res.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    const categories = ['All', 'Programming', 'Design', 'Business', 'Personal Development', 'Science'];
    const filteredBooks = selectedCategory === 'All' 
        ? books 
        : books.filter(book => book.categories.includes(selectedCategory));

    if (loading) {
        return (
            <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-10 bg-gray-200 rounded-lg w-96 mx-auto mb-12"></div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-10 bg-gray-200 rounded-lg"></div>
                            ))}
                        </div>
                        <div className="h-96 bg-gray-200 rounded-2xl"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-10 px-4 bg-gradient-to-br from-amber-50 via-white to-orange-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-4">
                        <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-amber-700">Recommended Reading</span>
                    </div>
                    <h1 className=" text-2xl md:text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
                        Books by Expert Tutors
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Essential reading materials recommended by our top instructors 
                    </p>
                </div>

               

                {/* Books Slider */}
                <div className="mb-12">
                    {filteredBooks.length > 0 ? (
                        <BooksSlider books={filteredBooks} />
                    ) : (
                        <div className="text-center  py-12">
                            <div className="w-24   h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Books Found</h3>
                        
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};

export default BooksSection; 