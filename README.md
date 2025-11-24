🏥 Agnos Realtime Patient System

ระบบจัดการข้อมูลผู้ป่วยพร้อมอัปเดตแบบ Real-Time (MockSocket Version)

Demo: https://agnos-realtime-patient-system-wzew.vercel.app/

Repository: https://github.com/PhawinTS/agnos-realtime-patient-system

📌 Overview

โปรเจกต์นี้เป็นระบบสำหรับจัดการข้อมูลผู้ป่วย (Patient Management) ที่รองรับการอัปเดตข้อมูลแบบ Real-Time ผ่าน MockSocket (จำลอง WebSocket) เพื่อให้แสดงผลเหมือนระบบ Production ที่ใช้ WebSocket จริง
สร้างด้วย Next.js + TypeScript + TailwindCSS และโครงสร้างแบบ Component-Based

🚀 Features

แสดงรายชื่อผู้ป่วยทั้งหมด

ดูข้อมูลรายละเอียดผู้ป่วย

แก้ไขข้อมูลผู้ป่วย

อัปเดตข้อมูลแบบ Real-Time ผ่าน MockSocket

UI/UX ใช้งานง่าย รองรับทุกอุปกรณ์ (Responsive)

🛠️ Tech Stack

Next.js 14 (App Router)

TypeScript

Tailwind CSS

MockSocket (ใช้แทน WebSocket จริง)

Shadcn UI Components

Deployed ด้วย Vercel

📂 Project Structure
/
├─ app/
│  ├─ api/               # Mock API
│  ├─ patient/[id]/      # หน้ารายละเอียดผู้ป่วย
│  ├─ page.tsx           # หน้า patient list
│  ├─ layout.tsx
│  └─ globals.css
├─ components/           # UI components
├─ lib/
│  ├─ socketClient.ts      # Mock WebSocket Logic
│  └─ api.ts    
├─ server/               # Mock Data (JSON)
├─ package.json
└─ README.md

🔌 Real-Time Update Flow (MockSocket)

user แก้ไขข้อมูลผู้ป่วย

กด Save → ส่ง event ผ่าน mockSocket.emit("patient:update")

mockSocket กระจายข้อมูลไป component อื่น ๆ

UI ทุกหน้าอัปเดตทันทีแบบ Real-Time

เหมือนใช้ WebSocket จริง แต่ไม่ต้องมี backend

🧩 ตัวอย่างการใช้งาน MockSocket
const socket = getSocket();

socket.emit("patient:update", updatedPatient);

socket.on("patient:update", (data) => {
  updateLocalStore(data);
});

🛠️ How to Run Locally
git clone https://github.com/PhawinTS/agnos-realtime-patient-system.git
cd agnos-realtime-patient-system
npm install
npm run dev


เปิดที่:
http://localhost:3000

🧾 Deployment

Deploy ผ่าน Vercel → พร้อมใช้งานทันที
Live Demo: https://agnos-realtime-patient-system-wzew.vercel.app/

📄 Author

Phawin Thongsen (Yim)
Front-End Developer