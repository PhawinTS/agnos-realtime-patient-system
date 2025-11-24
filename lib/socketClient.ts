import React, { useState, useEffect, useCallback } from 'react';
import { User, Phone, Mail, Calendar, Activity, Clock, AlertCircle, Users, CheckCircle, Edit3 } from 'lucide-react';

// Types
interface Patient {
  id: string;
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
  status: 'active' | 'submitted' | 'inactive';
  lastActivity: string;
}

// Mock Socket
const createMockSocket = () => {
  const listeners: Record<string, Array<(data: any) => void>> = {};
  return {
    on: (event: string, callback: (data: any) => void) => {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(callback);
    },
    off: (event: string, callback?: (data: any) => void) => {
      if (listeners[event]) {
        listeners[event] = callback
          ? listeners[event].filter(cb => cb !== callback)
          : [];
      }
    },
    emit: (event: string, data: any) => {
      if (listeners[event]) {
        listeners[event].forEach(cb => cb(data));
      }
    },
    _trigger: (event: string, data: any) => {
      if (listeners[event]) {
        listeners[event].forEach(cb => cb(data));
      }
    }
  };
};

export const mockSocket = createMockSocket();