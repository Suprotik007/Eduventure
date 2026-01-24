import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../Providers/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/allClass", label: "Classes" },
    { to: "/becomeTutor", label: "Teach" },
    ...(user ? [{ to: "/dashboard/profile", label: "Dashboard" }] : [])
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl py-3 border-b border-gray-200/30' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">EV</span>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className={`text-2xl font-bold transition-all duration-300 ${
                  scrolled 
                    ? 'bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent' 
                    : 'text-white'
                }`}>
                  EduVenture
                </span>
                <span className="text-xs text-gray-500 font-medium">Learn • Grow • Succeed</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `
                    relative px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300
                    ${isActive 
                      ? scrolled 
                        ? 'text-blue-700 bg-blue-50/80 shadow-sm' 
                        : 'text-white bg-white/20 backdrop-blur-sm'
                      : scrolled 
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-50' 
                        : 'text-gray-200 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  {link.label}
                  {link.to === '/allClass' && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                  )}
                </NavLink>
              ))}
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-3 group"
                  >
                    <div className="relative">
                      <img
                        src={user.photoURL || 'https://ui-avatars.com/api/?name=' + user.displayName}
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full border-2 border-white/50 group-hover:border-blue-500 transition-all duration-300 object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className={`text-sm font-semibold ${scrolled ? 'text-gray-800' : 'text-white'}`}>
                        {user.displayName?.split(' ')[0]}
                      </p>
                      <p className="text-xs text-gray-500">Student</p>
                    </div>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''} ${
                        scrolled ? 'text-gray-600' : 'text-gray-300'
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/30 overflow-hidden animate-fade-in-up">
                      {/* User Info */}
                      <div className="p-5 bg-gradient-to-r from-blue-50 to-purple-50">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.photoURL || 'https://ui-avatars.com/api/?name=' + user.displayName}
                            alt={user.displayName}
                            className="w-14 h-14 rounded-full border-2 border-white shadow-lg"
                          />
                          <div>
                            <h3 className="font-bold text-gray-900">{user.displayName}</h3>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <NavLink
                          to="/dashboard/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center space-x-3 px-5 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                          </div>
                          <span className="font-medium">Dashboard</span>
                        </NavLink>

                        <button
                          onClick={handleLogOut}
                          className="flex items-center space-x-3 px-5 py-3 text-red-600 hover:bg-red-50 w-full transition-colors duration-200 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200">
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                            </svg>
                          </div>
                          <span className="font-medium">Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                      Sign In
                    </button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button className="lg:hidden">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden mt-3 px-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-3 shadow-xl border border-gray-200/30">
            <div className="grid grid-cols-4 gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `
                    flex flex-col items-center p-2 rounded-lg transition-all duration-300
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <span className="text-xs font-medium">{link.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

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