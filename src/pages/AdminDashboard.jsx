import React, { useEffect, useState } from 'react';
import { getAdminStats } from '../services/api';
import { Stethoscope, Users, Calendar, Clock, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch (err) {
      setError('Failed to fetch dashboard metrics.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Hospital Admin Overview</h1>
        <p className="text-sm text-slate-500">Real-time statistics and hospital management dashboard</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 flex items-center space-x-3 text-sm">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-slate-200 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Doctors</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">{stats?.totalDoctors || 0}</p>
            </div>
            <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
              <Stethoscope className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Patients</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">{stats?.totalPatients || 0}</p>
            </div>
            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl">
              <Users className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Appointments</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">{stats?.totalAppointments || 0}</p>
            </div>
            <div className="bg-purple-50 text-purple-600 p-3 rounded-2xl">
              <Calendar className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Appointments</p>
              <p className="text-3xl font-extrabold text-amber-600 mt-1">{stats?.pendingAppointments || 0}</p>
            </div>
            <div className="bg-amber-50 text-amber-600 p-3 rounded-2xl">
              <Clock className="h-6 w-6" />
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Hospital Operations Summary</h2>
          <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full flex items-center space-x-1">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Active System</span>
          </span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          Welcome to the CarePulse Hospital Management Portal. As an Administrator, you can view real-time medical staff lists, register new patients, schedule appointments, and update medical consultation statuses.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
