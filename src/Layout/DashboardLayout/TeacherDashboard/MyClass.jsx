import React, { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router'; 
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import UpdateModal from '../../../Components/UpdateModal';

const MyClass = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: classes = [] } = useQuery({
    queryKey: ['myClasses', user?.email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/classes/teacher?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://localhost:5000/classes/${id}`);
    },
    onSuccess: () => {
      toast.success('Class deleted!');
      queryClient.invalidateQueries(['myClasses']);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This class will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
        Swal.fire('Deleted!', 'Your class has been deleted.', 'success');
      }
    });
  };

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      return await axios.patch(`http://localhost:5000/classes/${id}`, data);
      
      
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries(['myClasses']);
      toast.success('Class updated successfully!');
      setIsModalOpen(false);
    },
    onError: () => {
      toast.error('Update failed.');
    }
    
  });

 const handleUpdate = (id, data) => {
 
  updateMutation.mutate({ id, data });
};

  return (
    <div className="w-80   md:w-full mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-black">My Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <div key={cls._id} className="bg-black rounded-2xl text-white shadow-lg p-4">
            <img src={cls.image} alt={cls.title} className="w-full h-48 object-cover rounded-xl mb-3" />
            <h3 className="text-xl font-bold text-amber-400">{cls.title}</h3>
            <p><strong>Price:</strong> ${cls.price}</p>
            <p><strong>Description:</strong> {cls.description}</p>
            <p><strong>Status:</strong> <span className={
              cls.status === 'approved' ? 'text-green-400' :
                cls.status === 'rejected' ? 'text-red-400' : 'text-yellow-400'
            }>{cls.status}</span></p>

            <div className="grid grid-cols-2 md:flex gap-3 mt-4">
              <button
                onClick={() => {
                  
                  setSelectedClass(cls);
                  setIsModalOpen(true);
                }}
                className="btn btn-sm btn-warning"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(cls._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
              <Link
                to={`/dashboard/my-class/${cls._id}`}
                className={`btn btn-sm btn-info ${cls.status !== 'approved' ? 'btn-disabled' : ''}`}
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      
      {isModalOpen && selectedClass && (
        <UpdateModal
          isOpen={isModalOpen}
          classData={selectedClass}
          onClose={() => setIsModalOpen(false)}
          onUpdate={(data) => handleUpdate(selectedClass._id, data)}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default MyClass;
