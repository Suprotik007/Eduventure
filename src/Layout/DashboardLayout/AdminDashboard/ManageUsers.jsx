import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['users', search],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/users?search=${search}`);
      return res.data;
    }
  });

  const mutation = useMutation({
    mutationFn: async (email) => {
      return await axios.patch(`http://localhost:5000/users/make-admin/${email}`);
    },
    onSuccess: () => {
      toast.success('User promoted to admin!');
      queryClient.invalidateQueries(['users']);
    },
    onError: () => {
      toast.error('Failed to promote user');
    }
  });

  const handleMakeAdmin = (email) => {
    mutation.mutate(email);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      <input
        type="text"
        placeholder="Search by name or email"
        className="input input-bordered border-1 mb-4 w-full text-black font-semibold"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto rounded-3xl bg-black">
        <table className="table text-white w-full">
          <thead className='text-yellow-500'>
            <tr>
              <th>#</th>
              <th>User Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="6">Loading...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan="6">No users found</td></tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={user.photoURL || "https://via.placeholder.com/40"} alt="User" className="w-10 h-10 rounded-full" />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role || "student"}</td>
                  <td>
                    <button
                      disabled={user.role === 'admin'}
                      className={`btn btn-sm  ${user.role === 'admin' ? 'btn-disabled text-green-400' : ' text-black btn-info'}`}
                      onClick={() => handleMakeAdmin(user.email)}
                    >
                      {user.role === 'admin' ? 'Already Admin' : 'Make Admin '}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
