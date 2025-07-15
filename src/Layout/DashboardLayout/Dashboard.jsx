import { Outlet, NavLink } from 'react-router';
import useAuth from '../../Providers/useAuth';

const Dashboard = () => {
  const { role, loading } = useAuth();  
console.log(role);

  if (loading || !role) {
    return <div className="text-center mt-20 text-xl">Loading dashboard...</div>;
  }

 const navLinkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded-md transition-all duration-200 font-semibold ${
      isActive
        ? 'bg-gray-200 text-black'
        : 'text-white hover:bg-gray-400 hover:text-black'
    }`;
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className=" bg-black text-white p-4">
        <h2 className="text-xl font-bold border-b-2 mb-4">Edventure</h2>
        <ul className="space-y-2">
          {role === 'student' && (
            <>
              <li><NavLink className={navLinkClasses} to="/dashboard/my-enroll-class">📘 Enrolled Class</NavLink></li>
              <li><NavLink className={navLinkClasses} to="/dashboard/profile">👤 Profile</NavLink></li>
              <li><NavLink className={navLinkClasses} to="/">◀ Go Home</NavLink></li>
            </>
          )}
          {role === 'teacher' && (
            <>
              <li><NavLink className={navLinkClasses} to="/dashboard/add-class">➕ Add Class</NavLink></li>
              <li><NavLink className={navLinkClasses} to="/dashboard/my-class">📚 My Class</NavLink></li>
              <li><NavLink className={navLinkClasses} to="/dashboard/profile">👤 Profile</NavLink></li>
              <li><NavLink className={navLinkClasses} to="/">◀ Go Home</NavLink></li>
            </>
          )}
          {role === 'admin' && (
            <>
              <li><NavLink className={navLinkClasses}to="/dashboard/teacher-request">👩‍🏫 Teacher Request</NavLink></li>
              <li><NavLink className={navLinkClasses} to="/dashboard/users">👥 Users</NavLink></li>
              <li><NavLink className={navLinkClasses} to="/dashboard/all-classes">📋  Class Requests</NavLink></li>
              <li><NavLink className={navLinkClasses} to="/dashboard/profile">👤 Profile</NavLink></li>
              <li><NavLink className={navLinkClasses} to="/">◀ Go Home</NavLink></li>
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
