import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Stethoscope, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const DoctorDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="text-blue-100 text-sm mt-1">Doctor Portal & Clinical Schedule Overview</p>
        </div>
        <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
          <Stethoscope className="h-8 w-8 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-2">
          <Calendar className="h-6 w-6 text-blue-600" />
          <h3 className="font-bold text-slate-900">View Appointments</h3>
          <p className="text-xs text-slate-500">Check your assigned consultation schedules</p>
          <Link to="/appointments" className="inline-block pt-2 text-xs font-semibold text-blue-600 hover:underline">
            Go to Appointments &rarr;
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-2">
          <Clock className="h-6 w-6 text-amber-600" />
          <h3 className="font-bold text-slate-900">Pending Requests</h3>
          <p className="text-xs text-slate-500">Confirm or complete patient visits</p>
          <Link to="/appointments" className="inline-block pt-2 text-xs font-semibold text-blue-600 hover:underline">
            Manage Status &rarr;
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-2">
          <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          <h3 className="font-bold text-slate-900">Patients List</h3>
          <p className="text-xs text-slate-500">Access registered patient medical profiles</p>
          <Link to="/patients" className="inline-block pt-2 text-xs font-semibold text-blue-600 hover:underline">
            View Patients &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
