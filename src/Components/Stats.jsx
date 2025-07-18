import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Stats= () => {
  const { data = {} } = useQuery({
    queryKey: ['site-stats'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/stats`);
      return res.data;
    },
  });

  const { users = 0, classes = 0, enrollments = 0 } = data;

  return (
    <section className="my-10 px-4  md:w-10/12 mx-auto  gap-8 items-center">
     
      <div className="grid grid-cols-3  gap-4">
        <div className="bg-sky-200 shadow-xl p-6 rounded-2xl text-center">
          <h3 className="text-4xl font-bold  text-blue-600">{users}</h3>
          <p className="mt-2 text-blue-600 font-medium">Total Users</p>
        </div>
        <div className="bg-green-300 shadow-xl p-6 rounded-2xl text-center">
          <h3 className="text-4xl font-bold text-green-600">{classes}</h3>
          <p className="mt-2 text-green-800 font-medium">Total Classes</p>
        </div>
        <div className="bg-purple-200 shadow-xl p-6 rounded-2xl text-center">
          <h3 className="text-4xl font-bold text-purple-600">{enrollments}</h3>
          <p className="mt-2 text-purple-600 font-medium">Total Enrolled</p>
        </div>
      </div>

      
     
    </section>
  );
};

export default Stats;
