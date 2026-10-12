import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">CarePulse</span>
              <span className="block text-xs font-medium text-slate-500">Hospital Management</span>
            </div>
          </Link>

          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-slate-100 px-3 py-1.5 rounded-lg">
                <div className="bg-blue-100 text-blue-600 p-1.5 rounded-full">
                  <UserIcon className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-800 leading-none">{user.name}</p>
                  <span className="text-xs font-medium uppercase tracking-wider text-blue-600">{user.role}</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-slate-600 hover:text-red-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
