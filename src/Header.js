import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <nav className="flex items-center justify-between px-4 py-4 bg-white shadow-md">
        <Link to="/" className="text-xl font-semibold text-gray-800">
          YouCare Platform
        </Link>
         

        <div className="hidden lg:flex lg:items-center">
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
        </div>
      </nav>
    </>
  );
}
