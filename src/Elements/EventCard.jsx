import React from 'react';

const EventCard = ({event}) => {
     return (
    <div className="card py-5 bg-black h-130 text-white border-1 shadow-sm">
  <figure>
    <img className='border-1 rounded-lg'
      src={event.image}
      alt="Books" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-amber-400">
     {event.title}
    
    </h2>
    <p className='text-gray-300'>{event.description}</p>
    <div className="card-actions justify-end">
      <div className="badge badge-error font-semibold">{event.date}</div>
      <div className="badge badge-primary font-semibold"> {event.time}</div>
    </div>
  </div>
</div>
  );
};

export default EventCard;