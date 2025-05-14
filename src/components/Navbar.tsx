import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Landmark } from 'lucide-react';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Landmark className="w-8 h-8 text-orange-500" />
            <span className="font-bold text-xl">MonumentBook</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/monuments" className="text-gray-700 hover:text-orange-500">
              Monuments
            </Link>
            {user ? (
              <>
                <Link to="/my-bookings" className="text-gray-700 hover:text-orange-500">
                  My Bookings
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-orange-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-orange-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;