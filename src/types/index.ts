export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface BatteryData {
  id: string;
  make: string;
  model: string;
  age: number;
  isCertified: boolean;
  lastMaintenance: string;
  chargingFrequency: number; // Average charges per week
  averageTemperature: number; // In Celsius
  incidentCount: number;
}

export interface SafetyScore {
  score: number;
  category: 'Safe' | 'Moderate Risk' | 'High Risk';
  lastUpdated: string;
  history: {
    date: string;
    score: number;
  }[];
}

export interface Reward {
  id: string;
  title: string;
  points: number;
  description: string;
  iconName: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  progress: number;
  totalNeeded: number;
  iconName: string;
}

export interface SwapStation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  availableBatteries: number;
  distance?: number; // Distance from user in km
  isOpen: boolean;
  operatingHours: string;
}