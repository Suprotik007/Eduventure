import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../Providers/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/E-removebg-preview.png';

const Navbar = () => {
  const { user, role, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success('Logged Out successfully', {
          position: "top-center",
          theme: "dark"
        });
        setDropdownOpen(false);
      })
      .catch(() => {});
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleColor = (roleName) => {
    switch(roleName) {
      case 'admin': return 'from-red-500 to-orange-500';
      case 'teacher': return 'from-purple-500 to-pink-500';
      case 'student': return 'from-green-500 to-emerald-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  const getRoleIcon = (roleName) => {
    switch(roleName) {
      case 'admin': return '👑';
      case 'teacher': return '👨‍🏫';
      case 'student': return '🎓';
      default: return '👤';
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/allClass", label: "Classes" },
    { to: "/becomeTutor", label: "Teach"},
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 shadow-2xl py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg">
                  <img src={logo} alt="EduVenture Logo" className="w-10 h-10" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">
                  EduVenture
                </span>
                <span className="text-xs bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent font-bold">
                  Learn • Grow • Succeed
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-2xl px-2 py-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `
                    relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300
                    flex items-center space-x-2
                    ${isActive 
                      ? 'bg-white text-purple-600 shadow-lg' 
                      : 'text-white hover:bg-white/30 hover:text-white'
                    }
                  `}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  {/* User dropdown for desktop */}
                  <div className="hidden lg:block relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center space-x-3 group"
                    >
                      <div className="relative">
                        <img
                          src={user.photoURL || 'https://ui-avatars.com/api/?name=' + user.displayName}
                          alt={user.displayName}
                          className="w-12 h-12 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-all duration-300 object-cover"
                        />
                      </div>
                     
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-bold text-white">
                          {user.displayName?.split(' ')[0]}
                        </p>
                        <p className="text-xs bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent font-medium">
                          {role}
                        </p>
                      </div>
                      <svg 
                        className={`w-5 h-5 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''} text-white`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-3 w-72 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-purple-200 overflow-hidden animate-fade-in-up">
                        {/* User Info */}
                        <div className="p-6 bg-gradient-to-r from-purple-400 to-pink-400">
                          <div className="flex items-center space-x-4">
                            <img
                              src={user.photoURL || 'https://ui-avatars.com/api/?name=' + user.displayName}
                              alt={user.displayName}
                              className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-bold text-white text-lg">{user.displayName}</h3>
                              <p className="text-purple-100 text-sm font-semibold">{user.email}</p>
                              <div className="mt-2">
                                <span>{role}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <NavLink
                            to="/dashboard/profile"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center space-x-4 px-6 py-4 text-gray-700 hover:bg-purple-50 transition-all duration-200 group border-b border-gray-100"
                          >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                              </svg>
                            </div>
                            <div>
                              <span className="font-bold text-gray-900">Dashboard</span>
                              <p className="text-xs text-gray-500">View your dashboard</p>
                            </div>
                          </NavLink>

                          <button
                            onClick={handleLogOut}
                            className="flex items-center space-x-4 px-6 py-4 text w-full hover:bg-red-50"
                          >
                            <div className="w-10 h-10 rounded-xl flex items-center bg-red-100 justify-center group-hover:scale-110 transition-transform duration-200">
                              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                              </svg>
                            </div>
                            <div className='text-left'>
                              <span className="font-bold text-red-600">Log Out</span>
                              <p className="text-xs text-gray-600">Sign out from account</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mobile User Icon */}
                  <div className="lg:hidden">
                    <button
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      className="flex items-center space-x-2"
                    >
                      <div className="relative">
                        <img
                          src={user.photoURL || 'https://ui-avatars.com/api/?name=' + user.displayName}
                          alt={user.displayName}
                          className="w-10 h-10 rounded-full border-2 border-white shadow"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border border-white bg-gradient-to-r ${getRoleColor(role)}`}></div>
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <button className="hidden lg:block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                       Sign In
                    </button>
                    <button className="lg:hidden px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-bold shadow">
                      Sign In
                    </button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 bg-white/20 rounded-xl"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 backdrop-blur-sm shadow-2xl border-t border-white/20 rounded-b-2xl overflow-hidden animate-fade-in-down mx-4">
            <div className="px-4 py-6  ">
              {/* Navigation Links  */}
              <div className="flex flex-col space-y-2 mb-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => `
                      flex items-center space-x-3 px-5 py-4 rounded-xl font-medium transition-all duration-300
                      ${isActive 
                        ? 'bg-white text-purple-600 shadow-lg' 
                        : 'text-white hover:bg-white/20'
                      }
                    `}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span className="font-medium">{link.label}</span>
                  </NavLink>
                ))}
              </div>

              {/* User Actions for Mobile */}
              {user && (
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 mb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={user.photoURL || 'https://ui-avatars.com/api/?name=' + user.displayName}
                      alt={user.displayName}
                      className="w-14 h-14 rounded-full border-4 border-white shadow-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg">{user.displayName}</h3>
                      <p className="text-purple-100 text-sm truncate">{user.email}</p>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white mt-2`}>
                        {getRoleIcon(role)} {role}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <NavLink
                      to="/dashboard/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 p-4 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                      </div>
                      <div>
                        <span className="font-bold block">Dashboard</span>
                        <span className="text-xs opacity-90">View your dashboard</span>
                      </div>
                    </NavLink>

                    <button
                      onClick={() => {
                        handleLogOut();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl text-white hover:shadow-lg w-full transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                      </div>
                      <div>
                        <span className="font-bold block">Log Out</span>
                        <span className="text-xs opacity-90">Sign out from account</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Auth Links for Mobile */}
              {!user && (
                <div className="flex flex-col space-y-3">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/reg" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                      Register
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>

      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Navbar;