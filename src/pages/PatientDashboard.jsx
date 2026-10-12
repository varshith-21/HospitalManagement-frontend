import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Calendar, Stethoscope, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-lg flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hello, {user?.name}!</h1>
          <p className="text-emerald-100 text-sm mt-1">Patient Care & Booking Portal</p>
        </div>
        <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
          <User className="h-8 w-8 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
          <div className="flex items-center space-x-3 text-blue-600">
            <PlusCircle className="h-6 w-6" />
            <h3 className="font-bold text-slate-900 text-lg">Book an Appointment</h3>
          </div>
          <p className="text-sm text-slate-500">
            Select an available specialist doctor, choose a date and time slot for your consultation.
          </p>
          <Link
            to="/appointments"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-md"
          >
            <Calendar className="h-4 w-4" />
            <span>Book Appointment</span>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
          <div className="flex items-center space-x-3 text-emerald-600">
            <Stethoscope className="h-6 w-6" />
            <h3 className="font-bold text-slate-900 text-lg">Our Doctors</h3>
          </div>
          <p className="text-sm text-slate-500">
            Browse our list of certified doctors, cardiologists, neurologists, and general practitioners.
          </p>
          <Link
            to="/doctors"
            className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-md"
          >
            <Stethoscope className="h-4 w-4" />
            <span>View Doctors</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
