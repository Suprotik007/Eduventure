import React, { useEffect } from 'react';
import { useState } from 'react';
import EventCard from '../Elements/EventCard';

const Events = () => {

    const [events,setEvents]=useState([])
        useEffect(()=>{
            fetch('events.json')
            .then(res=>res.json())
            .then(data=>setEvents(data))
        },[])
    return (
        <div>
             <h1 className='text-4xl mb-15 font-semibold text-center '>Upcoming Webinars</h1>

<div  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  '>

 {
                events.map(event=>(<EventCard key={event.id} event={event}></EventCard>))
             }
</div>
            
        </div>
    );
};

export default Events;