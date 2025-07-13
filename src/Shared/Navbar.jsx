
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../Providers/AuthProvider';



const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);




  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success('Logged Out successfully');
        setDropdownOpen(false);
      })
      .catch(() => {
      
      });
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

  const links=(
        
        <div className="flex sm:space-x-1.5 md:space-x-8  font-semibold ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? ' border-b-2  ' : ''
          }
        >
          Home
        </NavLink>

         <NavLink
          to="/allClass"
          className={({ isActive }) =>
            isActive ? ' border-b-2 ' : ''
          }
        >
          All classes
        </NavLink>
      
       <NavLink
          to="/becomeTutor"
          className={({ isActive }) =>
            isActive ? ' border-b-2 ' : ''
          }
        >
        Become a Tutor
        </NavLink>
        
        {user &&(
            <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? ' border-b-2 ' : ''
          }
        >
        Dashboard
        </NavLink>
        )}
        
  
      </div>
  )

  return (
   <div>

     <div className="navbar rounded-bl-4xl rounded-br-4xl  bg-black text-white border-b-2   border-gray-600 px-5 mt-2 w-11/12 mx-auto ">
      <div className="navbar-start">
   <div className="dropdown   ">
    <div tabIndex={0} role="button" className="btn btn-ghost   lg:hidden">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5  hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
       </div>
       <ul
         tabIndex={0}
         className="  menu menu-xs dropdown-content bg-black rounded-box z-10 mt-4 w-100 p-2  shadow flex flex-col">
          {links}
       </ul> 
     </div>
     <a className=" text-xl font-bold logo-font ">Edventure</a>
   </div>
   <div className="navbar-center hidden lg:flex">
     <ul className="menu menu-horizontal px-1 ">
       {links}
     </ul>
  </div> 



      <div className="navbar-end relative gap-6">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <img
              src={user.photoURL || ''}
              alt={user.displayName || 'User'}
              title={user.displayName || ''}
              className="w-12 h-12 rounded-full cursor-pointer border "
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg border border-gray-200 z-20">
                <div className="px-4 py-2 border-b border-gray-100  font-semibold">
                  {user.displayName || 'User'}
                </div>

              <div className='px-4 py-2 border-b border-gray-100  text-amber-300 font-semibold'>
                    <NavLink
        to="/dashBoard"
        
      >
        Dashboard
      </NavLink>
              </div>

          <div>
                  <button
                  onClick={handleLogOut}
                  className="w-full text-left px-4 py-2  text-red-400 font-semibold"
                >
                  Log Out
                </button>
          </div>
              </div>
            )}
            
          </div>
          
        ) : (
          <Link to="/login">
            <button className="btn  btn-md rounded-full btn-outline">Login</button>
          </Link>
        )}
        <ToastContainer />
      </div>
      
    </div>
   </div>
  );
};

export default Navbar;
