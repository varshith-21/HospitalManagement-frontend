import React, { useEffect, useState } from 'react';
import { getAppointments, createAppointment, updateAppointment, deleteAppointment, getDoctors, getPatients } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Calendar, Plus, Trash2, Clock, CheckCircle, AlertCircle, X, Stethoscope, User } from 'lucide-react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    doctorId: '',
    patientId: '',
    appointmentDate: '',
    appointmentTime: '',
    status: 'PENDING',
  });

  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [appData, docData, patData] = await Promise.all([
        getAppointments(),
        getDoctors(),
        getPatients(),
      ]);
      setAppointments(appData);
      setDoctors(docData);
      setPatients(patData);
    } catch (err) {
      setError('Failed to load appointments data.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await createAppointment({
        ...formData,
        doctorId: parseInt(formData.doctorId, 10),
        patientId: parseInt(formData.patientId, 10),
      });
      setSuccess('Appointment booked successfully!');
      setShowModal(false);
      setFormData({ doctorId: '', patientId: '', appointmentDate: '', appointmentTime: '', status: 'PENDING' });
      fetchData();
    } catch (err) {
      setError('Failed to create appointment.');
    }
  };

  const handleStatusChange = async (appointment, newStatus) => {
    try {
      await updateAppointment(appointment.id, {
        ...appointment,
        status: newStatus,
      });
      fetchData();
    } catch (err) {
      setError('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this appointment entry?')) return;
    try {
      await deleteAppointment(id);
      fetchData();
    } catch (err) {
      setError('Failed to delete appointment.');
    }
  };

  const getDoctorName = (id) => {
    const d = doctors.find((doc) => doc.id === id);
    return d ? `${d.name} (${d.specialization})` : `Doctor #${id}`;
  };

  const getPatientName = (id) => {
    const p = patients.find((pat) => pat.id === id);
    return p ? p.name : `Patient #${id}`;
  };

  const getStatusBadge = (status) => {
    const s = status?.toUpperCase();
    if (s === 'CONFIRMED')
      return <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">Confirmed</span>;
    if (s === 'COMPLETED')
      return <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-semibold">Completed</span>;
    if (s === 'CANCELLED')
      return <span className="bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-xs font-semibold">Cancelled</span>;
    return <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-xs font-semibold">Pending</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointment Schedules</h1>
          <p className="text-sm text-slate-500">Manage patient consultations & doctor visit slots</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span>Book Appointment</span>
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm">{error}</div>}
      {success && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-200 text-sm flex items-center space-x-2">
          <CheckCircle className="h-4 w-4" />
          <span>{success}</span>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse h-48"></div>
      ) : appointments.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl text-center border border-slate-200 text-slate-500">
          No appointments scheduled yet.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Doctor</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {appointments.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-400">#{app.id}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{getPatientName(app.patientId)}</td>
                    <td className="px-6 py-4 text-slate-700">{getDoctorName(app.doctorId)}</td>
                    <td className="px-6 py-4 text-slate-600 text-xs">
                      <div className="font-semibold text-slate-800">{app.appointmentDate}</div>
                      <div className="text-slate-500">{app.appointmentTime}</div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <select
                          value={app.status || 'PENDING'}
                          onChange={(e) => handleStatusChange(app, e.target.value)}
                          className="text-xs border border-slate-300 rounded-lg px-2 py-1 bg-white outline-none"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Book New Appointment</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Select Doctor</label>
                <select
                  required
                  value={formData.doctorId}
                  onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">-- Select Specialist Doctor --</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} - {d.specialization}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Select Patient</label>
                <select
                  required
                  value={formData.patientId}
                  onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">-- Select Patient --</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Age: {p.age})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Time</label>
                  <input
                    type="time"
                    required
                    value={formData.appointmentTime}
                    onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
