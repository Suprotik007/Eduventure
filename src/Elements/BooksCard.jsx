import React from 'react';

const BooksCard = ({ book, index }) => {
  // Array of soft gradient combinations
  const cardGradients = [
    "from-blue-50/90 via-white to-cyan-50/90",
    "from-purple-50/90 via-white to-pink-50/90",
    "from-emerald-50/90 via-white to-teal-50/90",
    "from-amber-50/90 via-white to-orange-50/90",
    "from-violet-50/90 via-white to-fuchsia-50/90",
    "from-rose-50/90 via-white to-red-50/90",
    "from-sky-50/90 via-white to-blue-50/90",
    "from-lime-50/90 via-white to-green-50/90"
  ];

  const borderGradients = [
    "from-blue-200 via-blue-300 to-cyan-300",
    "from-purple-200 via-purple-300 to-pink-300",
    "from-emerald-200 via-emerald-300 to-teal-300",
    "from-amber-200 via-amber-300 to-orange-300",
    "from-violet-200 via-violet-300 to-fuchsia-300",
    "from-rose-200 via-rose-300 to-red-300",
    "from-sky-200 via-sky-300 to-blue-300",
    "from-lime-200 via-lime-300 to-green-300"
  ];

  const buttonGradients = [
    "from-blue-400 to-cyan-400",
    "from-purple-400 to-pink-400",
    "from-emerald-400 to-teal-400",
    "from-amber-400 to-orange-400",
    "from-violet-400 to-fuchsia-400",
    "from-rose-400 to-red-400",
    "from-sky-400 to-blue-400",
    "from-lime-400 to-green-400"
  ];

  const gradientIndex = index % cardGradients.length;
  const cardGradient = cardGradients[gradientIndex];
  const borderGradient = borderGradients[gradientIndex];
  const buttonGradient = buttonGradients[gradientIndex];

  // Function to handle PDF download
  const handleDownload = () => {
    if (!book.pdfURL) {
      alert(`No PDF available for "${book.bookName}"`);
      return;
    }
    
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = book.pdfURL;
    link.target = '_blank';
    
    // Extract filename from URL or use book name
    const filename = book.pdfURL.split('/').pop() || 
                    `${book.bookName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`;
    
    link.download = filename;
    link.rel = 'noopener noreferrer';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative group">
      {/* Gradient Border */}
      <div className={`absolute inset-0 bg-gradient-to-r ${borderGradient} rounded-2xl blur opacity-50 group-hover:opacity-80 transition-all duration-700 -z-10`}></div>
      
      {/* Main Card */}
      <div className={`relative bg-gradient-to-br ${cardGradient} rounded-2xl border border-gray-400 backdrop-blur-sm shadow-lg overflow-hidden group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-3`}>
        {/* Decorative Corner Elements */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-white/20 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
        
        {/* Book Cover */}
        <div className="relative overflow-hidden h-64">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20 z-10"></div>
          <img
            src={book.image}
            alt={book.bookName}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Top Overlay with Category */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/30 to-transparent p-4">
            <span className={`inline-block px-4 py-1.5 backdrop-blur-md bg-white/95 rounded-full text-xs font-semibold ${gradientIndex === 0 ? 'text-blue-700' : gradientIndex === 1 ? 'text-purple-700' : gradientIndex === 2 ? 'text-emerald-700' : gradientIndex === 3 ? 'text-amber-700' : gradientIndex === 4 ? 'text-violet-700' : gradientIndex === 5 ? 'text-rose-700' : gradientIndex === 6 ? 'text-sky-700' : 'text-lime-700'}`}>
              {book.categories}
            </span>
          </div>
          
          {/* Bottom Overlay  */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6">
            <h3 className="text-xl font-bold text-white line-clamp-1 drop-shadow-lg">{book.bookName}</h3>
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-200">4.8</span>
            </div>
          </div>
          
          {/* Floating Pages Animation */}
          <div className="absolute top-4 right-4 flex space-x-1">
            <div className="w-2 h-4 bg-white/30 rounded-sm transform rotate-6 group-hover:translate-y-1 transition-transform duration-500"></div>
            <div className="w-2 h-4 bg-white/40 rounded-sm transform -rotate-3 group-hover:-translate-y-1 transition-transform duration-500 delay-100"></div>
            <div className="w-2 h-4 bg-white/50 rounded-sm transform rotate-12 group-hover:translate-y-2 transition-transform duration-500 delay-200"></div>
          </div>
        </div>

        {/* Book Info */}
        <div className="p-6 relative">
          {/* Author Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${borderGradient} rounded-full blur opacity-60`}></div>
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <img
                    src={`https://ui-avatars.com/api/?name=${book.author}&background=4F46E5&color=fff&bold=true`}
                    alt={book.author}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{book.author}</p>
                <p className="text-xs text-gray-500 font-medium">Author</p>
              </div>
            </div>
            
            {/* Pages Count */}
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-violet-50 backdrop-blur-sm border border-gray-100 shadow-sm">
              <div className="rounded-md bg-blue-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-purple-500">{book.pages}</span>
                <span className="text-xs text-purple-500 block">pages</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
            {book.description}
          </p>

          {/* Additional Info */}
          <div className="flex items-center justify-between gap-10 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-md bg-purple-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Language</span>
                  <p className="text-sm font-medium text-gray-800">English</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-md bg-emerald-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Read Time</span>
                  <p className="text-sm font-medium text-gray-800">3-4 hrs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${buttonGradient} rounded-xl blur opacity-60 group-hover:opacity-80 transition-opacity duration-300`}></div>
            <button 
              onClick={handleDownload}
              className={`relative w-full px-6 py-3 bg-gradient-to-r ${buttonGradient} text-green-500 border bg-emerald-50/30 rounded-full text-sm font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 group/btn`}
              title={`Download ${book.bookName} PDF`}
            >
              <svg className="w-4 h-4 transform group-hover/btn:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              <span className='text-green-500'>Download PDF</span>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping opacity-75"></div>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksCard;