'use client';
import { User, Phone, Mail, Calendar, Activity, Clock, CheckCircle, Edit3 } from 'lucide-react';
import { Patient } from '@/app/type';

interface Props {
  patient: Patient;
}

export default function PatientCard({ patient }: Props) {
  // Status colors and indicators
  const statusConfig = {
    submitted: {
      color: 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-emerald-300',
      badge: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md',
      dot: 'bg-emerald-500 shadow-lg shadow-emerald-500/50',
      text: 'Submitted',
      icon: <CheckCircle size={14} className="animate-pulse" />
    },
    active: {
      color: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 border-blue-400',
      badge: 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md',
      dot: 'bg-blue-500 animate-pulse shadow-lg shadow-blue-500/50',
      text: 'Filling Form',
      icon: <Edit3 size={14} />
    },
    inactive: {
      color: 'bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 border-gray-300',
      badge: 'bg-gradient-to-r from-gray-400 to-slate-400 text-white shadow-sm',
      dot: 'bg-gray-400',
      text: 'Inactive',
      icon: <Clock size={14} />
    }
  };

  const status = patient.status || 'inactive';
  const config = statusConfig[status];

  const getTimeSince = (timestamp?: string) => {
    if (!timestamp) return 'Unknown';
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className={`relative p-6 rounded-2xl border-2 shadow-xl hover:shadow-2xl transition-all duration-300 ${config.color} transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden`}>
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/40 to-transparent rounded-full -mr-16 -mt-16 blur-2xl"></div>
      
      <div className="relative z-10">
        {/* Header with Avatar and Status */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 ring-4 ring-white">
              <User size={32} strokeWidth={2.5} />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${config.dot} rounded-full border-3 border-white`}></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-xl text-gray-900 break-words mb-2 leading-tight">
              {patient.firstName || '...'} {patient.middleName ? patient.middleName + ' ' : ''}{patient.lastName || '...'}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${config.badge} flex items-center gap-1.5`}>
                {config.icon}
                <span className="tracking-wide">{config.text}</span>
              </span>
              {patient.lastActivity && (
                <span className="text-xs font-medium text-gray-600 flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                  <Clock size={13} />
                  {getTimeSince(patient.lastActivity)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information Grid */}
        <div className="space-y-3 mb-4">
          <div className="grid grid-cols-1 gap-2.5">
            {patient.phone && (
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-white/50 hover:shadow-md transition-shadow">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  <Phone size={18} className="text-white" />
                </div>
                <span className="font-semibold text-gray-800">{patient.phone}</span>
              </div>
            )}
            
            {patient.email && (
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-white/50 hover:shadow-md transition-shadow">
                <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  <Mail size={18} className="text-white" />
                </div>
                <span className="font-medium text-gray-700 break-all text-sm">{patient.email}</span>
              </div>
            )}
            
            {patient.dob && (
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-white/50 hover:shadow-md transition-shadow">
                <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  <Calendar size={18} className="text-white" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-medium">Date of Birth</span>
                  <p className="font-semibold text-gray-800">{patient.dob}</p>
                </div>
              </div>
            )}
            
            {patient.gender && (
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-white/50 hover:shadow-md transition-shadow">
                <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  <Activity size={18} className="text-white" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-medium">Gender</span>
                  <p className="font-semibold text-gray-800 capitalize">{patient.gender}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        {patient.address && (
          <div className="mb-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Address</p>
            <p className="text-sm text-gray-700 leading-relaxed">{patient.address}</p>
          </div>
        )}

        {/* Personal Details */}
        {(patient.nationality || patient.preferredLanguage || patient.religion) && (
          <div className="grid grid-cols-1 gap-2 mb-4">
            {patient.nationality && (
              <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-white/40">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Nationality</span>
                <span className="text-sm font-semibold text-gray-800">{patient.nationality}</span>
              </div>
            )}
            {patient.preferredLanguage && (
              <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-white/40">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Language</span>
                <span className="text-sm font-semibold text-gray-800">{patient.preferredLanguage}</span>
              </div>
            )}
            {patient.religion && (
              <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-white/40">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Religion</span>
                <span className="text-sm font-semibold text-gray-800">{patient.religion}</span>
              </div>
            )}
          </div>
        )}

        {/* Emergency Contact */}
        {patient.emergencyContact && (
          <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-xl shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                <Phone size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1">Emergency Contact</p>
                <p className="font-semibold text-gray-800">{patient.emergencyContact}</p>
                {patient.emergencyrelationship && (
                  <p className="text-sm text-gray-600 mt-1">({patient.emergencyrelationship})</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};