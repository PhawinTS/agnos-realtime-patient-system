'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { Patient } from '@/app/type';
import { User, Phone, Mail, Calendar, Activity, Globe, Heart } from 'lucide-react';
import { mockSocket } from '@/lib/socketClient';

interface Props {
  onSubmit: (patient: Patient) => void;
}

export default function PatientForm({ onSubmit }: Props) {

  // ให้ sessionId เปลี่ยนได้!!
  const [sessionId, setSessionId] = useState(() => crypto.randomUUID());

  const [formData, setFormData] = useState<Omit<Patient, 'id' | 'timestamp' | 'status'>>({
    firstName: '', middleName: '', lastName: '', dob: '', gender: '',
    phone: '', email: '', address: '', preferredLanguage: '', nationality: '',
    emergencyContact: '', emergencyrelationship: '', religion: '', priority: 'medium',
  });

  const [lastActivity, setLastActivity] = useState(Date.now());
  const [status, setStatus] = useState<'active' | 'inactive' | 'submitted'>('inactive');

  const inputClasses =
    "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm hover:shadow-md";

  // ------------------------------
  // HANDLE CHANGE
  // ------------------------------
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
  
      setFormData(prev => ({ ...prev, [name]: value }));
      setStatus('active');
      setLastActivity(Date.now());
  
      // แยกเป็น useEffect รันทีหลัง ไม่อยู่ใน setFormData
    },
    []
  );

  useEffect(() => {
    if (status === 'active') {
      mockSocket._trigger('patient:field-update', {
        sessionId,
        formData,
        status: 'active',
        lastActivity: new Date().toISOString(),
      });
    }
  }, [formData, sessionId, status]);
  

  // ------------------------------
  // INACTIVITY 5 sec
  // ------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      if (status === 'active' && Date.now() - lastActivity > 5000) {
        setStatus('inactive');

        mockSocket._trigger('patient:field-update', {
          sessionId,
          formData,
          status: 'inactive',
          lastActivity: new Date().toISOString(),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastActivity, formData, sessionId, status]);

  // ------------------------------
  // HANDLE SUBMIT
  // ------------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = ['firstName', 'lastName', 'dob', 'gender', 'phone', 'email'] as const;
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in required field: ${field}`);
        return;
      }
    }

    const newPatient: Patient = {
      ...formData,
      id: sessionId,
      timestamp: new Date().toISOString(),
      status: 'submitted',
      lastActivity: new Date().toISOString(),
    };

    // เปลี่ยน Status
    setStatus('submitted');

    // ส่ง socket realtime
    mockSocket._trigger('patient:field-update', {
      sessionId,
      formData,
      status: 'submitted',
      lastActivity: new Date().toISOString(),
    });

    // ส่งข้อมูลให้ parent
    onSubmit(newPatient);

    // ล้างข้อมูลฟอร์ม
    setTimeout(() => {
      setFormData({
        firstName: '', middleName: '', lastName: '', dob: '', gender: '',
        phone: '', email: '', address: '', preferredLanguage: '', nationality: '',
        emergencyContact: '', emergencyrelationship: '', religion: '', priority: 'medium',
      });

      // สร้าง session ใหม่ให้เคสดำเนินต่อได้
      setSessionId(crypto.randomUUID());
      setStatus('inactive');
    }, 150);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">New Patient Registration</h2>
        <span className={`px-3 py-1 rounded-full font-medium text-white ${
          status === 'active' ? 'bg-green-500' :
          status === 'inactive' ? 'bg-gray-400' : 'bg-blue-600'
        }`}>
          {status.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Name Section */}
        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-white/50 flex items-center gap-3">
          <User size={24} className="text-blue-500" />
          <div className="flex-1 space-y-2">
            <input type="text" name="firstName" placeholder="First Name *" value={formData.firstName} onChange={handleChange} className={inputClasses} />
            <input type="text" name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} className={inputClasses} />
            <input type="text" name="lastName" placeholder="Last Name *" value={formData.lastName} onChange={handleChange} className={inputClasses} />
          </div>
        </div>

        {/* DOB & Gender */}
        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-white/50 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Calendar size={24} className="text-amber-500" />
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={inputClasses} />
          </div>
          <div className="flex items-center gap-3">
            <Activity size={24} className="text-teal-500" />
            <select name="gender" value={formData.gender} onChange={handleChange} className={inputClasses}>
              <option value="">Select Gender *</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-white/50 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Phone size={24} className="text-blue-500" />
            <input type="tel" name="phone" placeholder="Phone *" value={formData.phone} onChange={handleChange} className={inputClasses} />
          </div>
          <div className="flex items-center gap-3">
            <Mail size={24} className="text-purple-500" />
            <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} className={inputClasses} />
          </div>
          <div className="flex items-center gap-3">
            <Activity size={24} className="text-gray-500" />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className={inputClasses} />
          </div>
        </div>

        {/* Language / Nationality / Religion */}
        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-white/50 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Globe size={24} className="text-cyan-500" />
            <input type="text" name="preferredLanguage" placeholder="Preferred Language" value={formData.preferredLanguage} onChange={handleChange} className={inputClasses} />
          </div>
          <div className="flex items-center gap-3">
            <Globe size={24} className="text-green-500" />
            <input type="text" name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleChange} className={inputClasses} />
          </div>
          <div className="flex items-center gap-3">
            <Heart size={24} className="text-red-500" />
            <input type="text" name="religion" placeholder="Religion" value={formData.religion} onChange={handleChange} className={inputClasses} />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50/70 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-red-200 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Phone size={24} className="text-red-500" />
            <input type="text" name="emergencyContact" placeholder="Emergency Contact" value={formData.emergencyContact} onChange={handleChange} className={inputClasses} />
          </div>
          <div className="flex items-center gap-3">
            <Activity size={24} className="text-red-400" />
            <input type="text" name="emergencyrelationship" placeholder="Relationship" value={formData.emergencyrelationship ?? ''} onChange={handleChange} className={inputClasses} />
          </div>
        </div>
      </div>

      <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-2xl shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium">
        Submit Patient Information
      </button>
    </form>
  );
}
