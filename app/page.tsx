'use client';
import React, { useEffect, useState } from 'react';
import { Patient } from '@/app/type';
import { mockSocket } from '@/lib/socketClient';
import PatientForm from '@/components/PatientForm';
import PatientList from '@/components/PatientList';

export default function PatientManagementSystem() {
  const [patients, setPatients] = useState<Patient[]>([]);

  const handleNewPatient = (patient: Patient) => {
    setPatients(prev => {
      if (!prev.some(p => p.id === patient.id)) {
        return [...prev, patient];
      }
      return prev;
    });
  };

  useEffect(() => {
    const handleFieldUpdate = (data: any) => {
      setPatients(prev => {
        const index = prev.findIndex(p => p.id === data.sessionId);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            ...data.formData,
            status: data.status || updated[index].status,
            lastActivity: data.lastActivity,
          };
          return updated;
        } 
        
        // ถ้าเป็น active ใหม่ และยังไม่มีใน list → เพิ่ม
        else if (data.status === 'active' && !prev.some(p => p.id === data.sessionId)) {
          return [
            ...prev,
            {
              id: data.sessionId || crypto.randomUUID(),
              timestamp: new Date().toISOString(),
              status: 'active',
              lastActivity: data.lastActivity,
              ...data.formData,
            }
          ];
        }

        return prev;
      });
    };

    mockSocket.on('patient:field-update', handleFieldUpdate);
    return () => mockSocket.off('patient:field-update', handleFieldUpdate);
  }, []);

  return (
    <div className="space-y-10 p-6 max-w-6xl mx-auto">
      <PatientForm onSubmit={handleNewPatient} />

      {/* ใช้ PatientList ใหม่แทน table */}
      <PatientList patients={patients} />
    </div>
  );
}
