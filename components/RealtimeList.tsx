"use client";
import { useEffect, useState } from "react";
import { socket } from "../lib/api";
import { User, Phone, Mail, Calendar, Activity, Globe, Heart } from "lucide-react";

interface RealtimePatient {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address?: string;
  preferredLanguage?: string;
  nationality?: string;
  religion?: string;
  emergencyContact?: string;
  emergencyrelationship?: string;
  symptoms?: string;
  status: "active" | "inactive" | "submitted";
}

export default function RealTimeList() {
  const [patients, setPatients] = useState<RealtimePatient[]>([]);

  useEffect(() => {
    socket.on("patient_update", (data: RealtimePatient[]) => {
      setPatients(data);
    });

    return () => {
      socket.off("patient_update");
    };
  }, []);

  return (
    <div className="space-y-4">
      {patients.length === 0 && (
        <p className="text-gray-500 text-sm">No patient data yet.</p>
      )}

      {patients.map((p) => (
        <div
          key={p.id}
          className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-white/50 flex flex-col gap-3"
        >
          {/* Header: Name + Status */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <User size={24} className="text-blue-500" />
              <p className="font-semibold text-lg">{p.firstName} {p.middleName ? p.middleName + " " : ""}{p.lastName}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm text-white font-medium ${
                p.status === "active" ? "bg-green-500" :
                p.status === "inactive" ? "bg-gray-400" :
                "bg-blue-600"
              }`}
            >
              {p.status.toUpperCase()}
            </span>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-700">
            <div className="flex items-center gap-2"><Calendar size={16} /> DOB: {p.dob}</div>
            <div className="flex items-center gap-2"><Activity size={16} /> Gender: {p.gender}</div>
            <div className="flex items-center gap-2"><Phone size={16} /> Phone: {p.phone}</div>
            <div className="flex items-center gap-2"><Mail size={16} /> Email: {p.email}</div>
            {p.address && <div className="flex items-center gap-2"><Activity size={16} /> Address: {p.address}</div>}
            {p.preferredLanguage && <div className="flex items-center gap-2"><Globe size={16} /> Language: {p.preferredLanguage}</div>}
            {p.nationality && <div className="flex items-center gap-2"><Globe size={16} /> Nationality: {p.nationality}</div>}
            {p.religion && <div className="flex items-center gap-2"><Heart size={16} /> Religion: {p.religion}</div>}
            {p.emergencyContact && <div className="flex items-center gap-2"><Phone size={16} /> Emergency: {p.emergencyContact} ({p.emergencyrelationship})</div>}
            {p.symptoms && <div className="flex items-center gap-2"><Activity size={16} /> Symptoms: {p.symptoms}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
