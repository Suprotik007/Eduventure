import React from 'react';

const BooksCard = ({book}) => {
  return (
    <div className="card bg-gray-100 py-5 m border-1 shadow-sm">
  <figure>
    <img className='border-1'
      src={book.image}
      alt="Books" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
     {book.bookName}
      <div className="badge badge-neutral">{book.categories}</div>
    </h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions justify-end">
      <div className="badge badge-neutral">{book.author}</div>
      <div className="badge badge-neutral">Pages : {book.pages}</div>
    </div>
  </div>
</div>
  );
};

export default BooksCard;
