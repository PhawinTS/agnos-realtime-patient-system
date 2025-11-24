import { io, Socket } from "socket.io-client";

// ประกาศ type ของข้อมูลผู้ป่วย
export interface PatientData {
  firstName: string;
  middleName?: string;
  lastName: string;
  phone: string;
  email: string;
  dob: string;
  age: string | number;
  symptoms: string;
  priority: "low" | "medium" | "high";
}

// สร้าง socket พร้อม type
export const socket: Socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

// function ส่งข้อมูลผู้ป่วยไป Next.js API
export async function submitPatient(data: PatientData): Promise<any> {
  const res = await fetch("/api/patient", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}
