export interface Patient {
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
    emergencyContact?: string;
    emergencyrelationship?: string;
    religion?: string;
    priority?: 'high' | 'medium' | 'low';
    timestamp: string;
    status?: 'active' | 'submitted' | 'inactive'; // เพิ่ม status
    lastActivity?: string;
  }