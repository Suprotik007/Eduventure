import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router';


const fetchClasses = async () => {
  const res = await axios.get('http://localhost:5000/classes');
  return res.data;
};

const AllClassCard = () => {
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ['approvedClasses'],
    queryFn: fetchClasses
  });

  if (isLoading) return <p>Loading...</p>;


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {classes.map(cls => (
         <div className="card bg-black text-white py-5 m border-1 shadow-sm">
  <figure>
    <img className='border-1'
      src={cls.image}
      alt="Books" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-amber-400">
     {cls.title}
      <div className="badge badge-primary">${cls.price}</div>
    </h2>
    <p className='text-gray-300 font-medium'>{cls.description}</p>
    <div className="card-actions">
      <div className=" text-lg font-semibold">Total Enrolled : <span className='badge badge-accent font-bold'>
        {cls.totalEnrolled}</span></div>

      
     
    </div>
     <div>
         <Link to='/classDtl'>
         <button className='btn btn-primary btn-wide'>Enroll</button></Link>
     </div>
  </div>
</div>
      ))}
    </div>
  );
};

export default AllClassCard;
