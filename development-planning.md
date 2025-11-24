🗂️ Development Planning Documentation
Agnos Realtime Patient System

1️⃣ Project Structure

โครงสร้างโปรเจกต์ออกแบบให้มีความชัดเจน แยกความรับผิดชอบของแต่ละส่วนอย่างชัดเจน เพื่อให้แก้ไขและขยายฟีเจอร์ได้ง่าย

/
├─ app/                          # Next.js App Router
│  ├─ api/                       # Mock API endpoints
│  ├─ patient/
│  │   └─ [id]/page.tsx          # Patient detail page
│  ├─ layout.tsx                 # Layout หลักของระบบ
│  ├─ page.tsx                   # Patient List page (home)
│  └─ globals.css                # Global styles
│
├─ components/                   # UI Components ทั้งหมด
│  ├─ PatientCard.tsx
│  ├─ PatientForm.tsx
│  ├─ Navbar.tsx
│  └─ Loading.tsx
│
├─ lib/
│  ├─ mockSocket.ts              # Mock WebSocket (Realtime)
│  ├─ patientStore.ts            # Global State (Zustand หรือ custom)
│  └─ utils.ts                   # Utilities ต่าง ๆ
│
├─ server/
│  └─ patients.json              # Data mock สำหรับ API / realtime
│
├─ public/                       # รูปภาพ icon หรือไฟล์ asset
│
├─ package.json
└─ README.md

📌 หลักการออกแบบโครงสร้าง

แยก Components ออกมาชัดเจน → นำกลับมาใช้ซ้ำได้ง่าย

แยก lib/ → สำหรับ logic ที่ไม่เกี่ยวกับ UI (Business logic)

ใช้ App Router ของ Next.js เพื่อจัดการ routing แบบ modern

server/ ใช้เก็บข้อมูล mock ให้เหมือน backend จริง

api/ รองรับการดึงข้อมูลและแก้ไขแบบ REST ภายใน Next.js



2️⃣ Design (UI / UX Decisions)

ระบบนี้ออกแบบโดยคำนึงถึงสิ่งต่อไปนี้:

🎯 Design Goals

ใช้งานง่ายสำหรับ Staff / พยาบาล / เจ้าหน้าที่โรงพยาบาล

ใช้โทนสี เรียบ สบายตา, มือใหม่ใช้งานได้เลย

ข้อมูลผู้ป่วยต้อง อ่านง่าย ชัดเจน

UI รองรับการใช้งานทั้ง Mobile, Tablet, Desktop

🧭 Layout Decisions

ใช้ Top Navigation Bar เพื่อให้เข้าถึงเมนูต่าง ๆ ได้ง่าย

พื้นหลังเป็นสี gray-50 เพื่อให้เนื้อหาโดดเด่น

Card แต่ละผู้ป่วยใช้ Shadow + Border เพื่ออ่านง่าย

แต่ละส่วนของหน้าใช้ spacing (p-4, mt-6) ที่กว้างพอ สบายตา

🎨 Color Palette

ฟ้าอ่อน / น้ำเงิน: ความหมายถึง หลอดเลือด / สุขภาพ

เทาอ่อน: ให้ความเป็นมืออาชีพ สะอาด

ขาว: อ่านง่าย เน้นความสะอาดตา

📱 Responsive Strategy

ใช้ Flex + Grid + Tailwind Breakpoints เช่น:

sm: (mobile)

md: (tablet)

lg: (desktop)

ตัวอย่างที่ใช้จริง:

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


ทำให้ layout เปลี่ยนตามขนาดหน้าจอได้อัตโนมัติ


3️⃣ Component Architecture

แยกเป็น 3 กลุ่มใหญ่:
UI Components, Page Components, Logic Components

📦 Main Components & Responsibility

1. PatientList (app/page.tsx)
ดึงข้อมูลผู้ป่วยทั้งหมด
แสดงในรูปแบบ card/grid
ฟัง event realtime เพื่อตรวจสอบว่า list ต้องอัปเดตไหม

2. PatientDetail (app/patient/[id]/page.tsx)
แสดงข้อมูลผู้ป่วยแบบละเอียด
มีฟอร์มเพื่อแก้ข้อมูล
ส่งข้อมูลกลับผ่าน mockSocket

3. PatientForm.tsx
ใช้ในการแก้ไขข้อมูล เช่น ชื่อ อายุ อาการ
มี validate ขั้นพื้นฐาน

4. PatientCard.tsx
ใช้ในหน้า list เพื่อแสดงผู้ป่วยแบบ card
กดแล้วจะเข้าไปยังหน้า detail

5. Navbar.tsx
ตัวนำทางหลักของระบบ
มีชื่อระบบ + ปุ่ม Navigate

6. mockSocket.ts (สำคัญมาก)
จำลองการทำงานของ WebSocket
ให้ function: emit, on, off
Broadcasting event เพื่อให้หน้าอื่นอัปเดต real-time

7. patientStore.ts
Global state เพื่อเก็บข้อมูลทั้งหมด
เก็บ patients list และจัดการ update



4️⃣ Realtime Synchronization Flow

โปรเจกต์นี้ใช้ Mock WebSocket เพื่อจำลอง WebSocket จริง แต่ทำงานร่วมกับ UI แบบทันที


🔄 Workflow Summary

ผู้ใช้แก้ไขข้อมูลผู้ป่วย
กด Save → emit event patient:update
mockSocket ส่งข้อมูล broadcast ให้ทุก client
หน้าทั้งหมดที่ subscribe อยู่ จะรับ event
UI update ทันที → ไม่ต้อง refresh หน้าเว็บ

🧠 Detailed Data Flow
sequenceDiagram
    participant User
    participant UI
    participant MockSocket
    participant OtherClients

    User->>UI: Edit patient & click Save
    UI->>MockSocket: emit("patient:update", data)
    MockSocket->>OtherClients: broadcast event
    OtherClients->>UI: update patient store
    UI->>UI: Rerender new data automatically


🧩 Example Code
Emit event เมื่อกด Save
const socket = getSocket();
socket.emit("patient:update", formData);

Listen event ในหน้าอื่น
useEffect(() => {
  socket.on("patient:update", (updated) => {
    updatePatientStore(updated);
  });
}, []);


5️⃣ Why This Architecture?
หมวด	                    เหตุผล
Next.js (App Router)	    Routing ชัดเจน + รองรับ SSR/CSR ในอนาคต
Component Separation	    แก้ไขง่าย เพิ่มฟีเจอร์ง่าย
MockSocket	                ไม่ต้องใช้ backend จริง, แต่ได้ behavior แบบ realtime
Zustand-like store	        state management ที่เบาและเร็ว
Tailwind	                ปรับ UI เร็ว, responsive ทันที


6️⃣ Future Improvements

เพิ่ม Authentication (Staff Login)
เชื่อม Backend จริงผ่าน REST หรือ WebSocket
เพิ่ม Pagination สำหรับผู้ป่วยจำนวนมาก
เพิ่มระบบ Notification เมื่อมีการอัปเดต
Integrate Database เช่น Supabase หรือ Firebase