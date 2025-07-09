import React from 'react';

const BooksCard = ({book}) => {
  return (
    <div className="card bg-black text-white py-5 m border-1 shadow-sm">
  <figure>
    <img className='border-1'
      src={book.image}
      alt="Books" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-amber-400">
     {book.bookName}
      <div className="badge badge-accent">{book.categories}</div>
    </h2>
    <p className='text-gray-300'>{book.description}</p>
    <div className="card-actions justify-end">
      <div className="badge badge-primary font-medium">{book.author}</div>
      <div className="badge badge-error font-medium">Pages : {book.pages}</div>
    </div>
  </div>
</div>
  );
};

export default BooksCard;
