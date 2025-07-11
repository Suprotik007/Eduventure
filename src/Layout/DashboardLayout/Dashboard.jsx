

import { Outlet, NavLink } from 'react-router';
import useAuth from '../../Providers/useAuth';
// import useAuth from '../Providers/useAuth';

const Dashboard = () => {
  const { userRole } = useAuth(); // should be 'admin', 'teacher', or 'student'

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          {userRole === 'student' && (
            <>
              <li><NavLink to="/dashboard/my-enroll-class">📘 My Enroll Class</NavLink></li>
              <li><NavLink to="/dashboard/profile">👤 Profile</NavLink></li>
            </>
          )}
          {userRole === 'teacher' && (
            <>
              <li><NavLink to="/dashboard/add-class">➕ Add Class</NavLink></li>
              <li><NavLink to="/dashboard/my-class">📚 My Class</NavLink></li>
              <li><NavLink to="/dashboard/profile">👤 Profile</NavLink></li>
            </>
          )}
          {userRole === 'admin' && (
            <>
              <li><NavLink to="/dashboard/teacher-request">👩‍🏫 Teacher Request</NavLink></li>
              <li><NavLink to="/dashboard/users">👥 Users</NavLink></li>
              <li><NavLink to="/dashboard/all-classes">📋 All Classes</NavLink></li>
              <li><NavLink to="/dashboard/profile">👤 Profile</NavLink></li>
            </>
          )}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
