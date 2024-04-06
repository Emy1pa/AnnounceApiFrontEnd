import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  let user = JSON.parse(localStorage.getItem('user-info'));
  const userRole = localStorage.getItem("user-role");
  const location = useLocation();
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Function to check if the user is in the organizer or volunteer component
  const isOrganizerOrVolunteer = () => {
    return location.pathname.includes('/organizer') || location.pathname.includes('/volunteer');
  };

  return (
    <> 
      <nav className="flex items-center justify-between px-4 py-4 bg-white shadow-md">
        <Link to="/" className="text-xl font-semibold text-gray-800">
          YouCare Platform
        </Link>

        <div className="hidden lg:flex lg:items-center">
          { !isOrganizerOrVolunteer() && (
            <>
              <Link
                to="/login"
                className="ml-6 py-2 px-4 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="ml-6 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
              >
                Sign up
              </Link>
            </>
          )}
          
          {/* Dropdown Menu */}
          { (userRole === "organizer" || userRole === "volunteer") && isOrganizerOrVolunteer() ?
            <div className="relative">
              <button className="ml-6 py-2 px-4 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200" onClick={toggleDropdown}>
                Account
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-md z-10">
                  <Link
                    to="/logout"
                    onClick={() => { logOut(); closeDropdown(); }}
                    className="flex items-center px-4 py-2 transition duration-300 border border-transparent rounded-lg hover:bg-slate-200 hover:text-white"
                  >
                    <svg
                      className="w-6 h-6 mr-2 text-gray-600" // Change color and size as needed
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                      />
                    </svg>
                    <span className="text-gray-600">Logout</span>
                  </Link>
                </div>
              )}
            </div>
            : null}
        </div>
      </nav>
    </>
  );
}
