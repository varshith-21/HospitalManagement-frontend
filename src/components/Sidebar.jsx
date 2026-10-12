import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Stethoscope, Users, Calendar, Shield } from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  const role = user?.role?.toUpperCase();

  const getDashboardPath = () => {
    if (role === 'ADMIN') return '/admin';
    if (role === 'DOCTOR') return '/doctor-dashboard';
    if (role === 'PATIENT') return '/patient-dashboard';
    return '/admin';
  };

  const navItems = [
    { label: 'Dashboard', path: getDashboardPath(), icon: LayoutDashboard },
    { label: 'Doctors', path: '/doctors', icon: Stethoscope },
    { label: 'Patients', path: '/patients', icon: Users },
    { label: 'Appointments', path: '/appointments', icon: Calendar },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between">
      <div className="space-y-6">
        <div className="px-3 py-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Navigation</p>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-md'
                      : 'hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="bg-slate-800 p-3 rounded-xl border border-slate-700/50 flex items-center space-x-3">
        <Shield className="h-5 w-5 text-blue-400" />
        <div>
          <p className="text-xs font-medium text-slate-300">System Mode</p>
          <p className="text-xs text-blue-400 font-semibold">{role || 'GUEST'} Portal</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
