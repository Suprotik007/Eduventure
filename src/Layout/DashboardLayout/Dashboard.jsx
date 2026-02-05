import { Outlet, NavLink } from 'react-router';
import useAuth from '../../Providers/useAuth';
import logo from '../../assets/E-removebg-preview.png';

const Dashboard = () => {
  const { role, loading, user } = useAuth();  

  if (loading || !role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  

  const getRoleColor = (roleName) => {
    switch(roleName) {
      case 'student': return 'from-blue-500 to-cyan-500';
      case 'teacher': return 'from-purple-500 to-pink-500';
      case 'admin': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const navLinkClasses = ({ isActive }) =>
    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? `bg-gradient-to-r ${getRoleColor(role)} text-white shadow-lg`
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  const studentLinks = [
    { to: "/dashboard/my-enroll-class", label: "Enrolled Classes" },
    { to: "/dashboard/profile", label: "Profile" },
  ];

  const teacherLinks = [
    { to: "/dashboard/my-class", label: "My Classes" },
    { to: "/dashboard/profile", label: "Profile"},
    { to: "/dashboard/add-class", label: "Add Class" },
  ];

  const adminLinks = [
    { to: "/dashboard/teacher-request", label: "Teacher Requests" },
    { to: "/dashboard/users", label: "Manage Users" },
    { to: "/dashboard/all-classes", label: "Class Requests" },
    { to: "/dashboard/profile", label: "Profile" },
  ];

  const links = role === 'student' ? studentLinks : role === 'teacher' ? teacherLinks : adminLinks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-6 shadow-lg">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r  flex items-center justify-center`}>
              <img src={logo} alt="" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">EduVenture</h2>
                <p className="text-sm text-gray-500 capitalize">{role} Dashboard</p>
              </div>
            </div>

            {/* User Info */}
            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl mb-6">
              <div className="flex items-center space-x-3">
                <img
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=4F46E5&color=fff`}
                  alt={user?.displayName}
                  className="w-10 h-10 rounded-full border-2 border-white shadow"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.displayName}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClasses}>
                <span className="text-lg">{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </NavLink>
            ))}
            
            {/* Home Link */}
            <NavLink to="/" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300">
              <span className="text-lg">◀</span>
              <span className="font-medium">Go Home</span>
            </NavLink>
          </nav>

          {/* Stats */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className={`text-2xl font-bold bg-gradient-to-r ${getRoleColor(role)} bg-clip-text text-transparent`}>
                {role === 'student' ? 'Learner' : role === 'teacher' ? 'Instructor' : 'Admin'}
              </div>
              <p className="text-sm text-gray-500 mt-1">Dashboard Access</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ">
          <div className="max-w-7xl mx-auto">
          
           
            {/* Content Area */}
            <div className="card-modern">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;