"use client";
import PatientCard from "./PatientCard";
import { Patient } from "@/app/type";

interface Props {
  patients: Patient[];
}

export default function PatientList({ patients }: Props) {
  if (!patients || patients.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400 text-sm">
        No patient data yet.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Patient List</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {patients.map(patient => (
          <div key={patient.id} className="transition-transform hover:scale-[1.02]">
            <PatientCard patient={patient} />
          </div>
        ))}
      </div>
    </div>
  );
}
