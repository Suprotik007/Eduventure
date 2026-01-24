import React from 'react';

const BooksCard = ({ book }) => {
  return (
    <div className="card-modern overflow-hidden group hover:-translate-y-2 transition-all duration-500">
      {/* Book Cover */}
      <div className="relative overflow-hidden h-64">
        <img
          src={book.image}
          alt={book.bookName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4">
          <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800">
            {book.categories}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-lg font-bold text-white line-clamp-1">{book.bookName}</h3>
        </div>
      </div>

      {/* Book Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src={`https://ui-avatars.com/api/?name=${book.author}&background=4F46E5&color=fff`}
                alt={book.author}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{book.author}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            <span className="text-sm">{book.pages} pages</span>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{book.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400"
                  fill={i < 4 ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">4.5</span>
          </div>
          
          <button className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:from-blue-100 hover:to-blue-200 transition-all duration-200">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BooksCard;