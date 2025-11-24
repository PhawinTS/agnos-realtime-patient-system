'use client';
import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import PatientCard from './PatientCard';
import { Patient } from '@/app/type';

interface Props {
  patients: Patient[];
}

export default function StaffDashboard({ patients }: Props) {
  const [filter, setFilter] = useState<'all' | 'active' | 'submitted' | 'inactive'>('all');

  // Filter patients by status
  const filteredPatients = patients.filter(p => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  // Count by status
  const counts = {
    all: patients.length,
    active: patients.filter(p => p.status === 'active').length,
    submitted: patients.filter(p => p.status === 'submitted').length,
    inactive: patients.filter(p => p.status === 'inactive').length,
  };

  return (
    <div className="space-y-6">
      {/* Header with Filter Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Patient Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">
            Real-time patient monitoring • {counts.all} total patient{counts.all !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filter Buttons - Responsive */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({counts.all})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'active'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Active ({counts.active})
          </button>
          <button
            onClick={() => setFilter('submitted')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'submitted'
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Submitted ({counts.submitted})
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'inactive'
                ? 'bg-gray-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Inactive ({counts.inactive})
          </button>
        </div>
      </div>

      {/* Patient Grid - Fully Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {filteredPatients.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-md border border-gray-200">
            <AlertCircle className="mx-auto text-gray-400 mb-3" size={48} />
            <p className="text-gray-500 font-medium">No patients found</p>
            <p className="text-sm text-gray-400 mt-1">
              {filter !== 'all'
                ? `No ${filter} patients at the moment`
                : 'Patients will appear here in real-time'}
            </p>
          </div>
        ) : (
          filteredPatients.map(patient => (
            <div
              key={patient.id}
              className="transition-transform duration-200 hover:scale-105"
            >
              <PatientCard patient={patient} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}