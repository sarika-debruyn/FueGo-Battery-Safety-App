import { BatteryData, SafetyScore, Reward, Achievement, SwapStation, User } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatarUrl: 'profile_pic.jpg',
};

export const batteryData: BatteryData = {
  id: 'bat-123456',
  make: 'EnergyX',
  model: 'MaxCharge Pro',
  age: 1.5,
  isCertified: true,
  lastMaintenance: '2025-03-15',
  chargingFrequency: 3.5,
  averageTemperature: 28.3,
  incidentCount: 0,
};

export const safetyScore: SafetyScore = {
  score: 87,
  category: 'Safe',
  lastUpdated: '2025-05-15',
  history: [
    { date: '2025-01-15', score: 78 },
    { date: '2025-02-15', score: 82 },
    { date: '2025-03-15', score: 85 },
    { date: '2025-04-15', score: 84 },
    { date: '2025-05-15', score: 87 },
  ],
};

export const availableRewards: Reward[] = [
  {
    id: 'reward-1',
    title: 'Battery Inspection Discount',
    points: 200,
    description: '15% off your next battery inspection service',
    iconName: 'battery-charging',
  },
  {
    id: 'reward-2',
    title: 'Premium Insurance Discount',
    points: 350,
    description: '10% discount on battery insurance premium',
    iconName: 'shield-check',
  },
  {
    id: 'reward-3',
    title: 'Free Battery Swap',
    points: 500,
    description: 'One free battery swap at any partner station',
    iconName: 'repeat',
  },
  {
    id: 'reward-4',
    title: 'Priority Service',
    points: 300,
    description: 'Priority service at all maintenance centers',
    iconName: 'crown',
  },
];

export const userAchievements: Achievement[] = [
  {
    id: 'achievement-1',
    title: 'Safety Streak',
    description: 'Maintain a "Safe" rating for 4 consecutive weeks',
    isCompleted: true,
    progress: 4,
    totalNeeded: 4,
    iconName: 'award',
  },
  {
    id: 'achievement-2',
    title: 'Maintenance Master',
    description: 'Complete 5 battery maintenance checks',
    isCompleted: false,
    progress: 3,
    totalNeeded: 5,
    iconName: 'tool',
  },
  {
    id: 'achievement-3',
    title: 'Temperature Tamer',
    description: 'Keep battery temperature below 30°C for 30 days',
    isCompleted: false,
    progress: 21,
    totalNeeded: 30,
    iconName: 'thermometer',
  },
];

export const nearbySwapStations: SwapStation[] = [
  {
    id: 'station-1',
    name: 'Urban Swap Center',
    address: '123 Main St, Cityville',
    latitude: 37.7749,
    longitude: -122.4194,
    availableBatteries: 8,
    distance: 1.2,
    isOpen: true,
    operatingHours: '8:00 AM - 9:00 PM',
  },
  {
    id: 'station-2',
    name: 'Express Swap Hub',
    address: '456 Market St, Cityville',
    latitude: 37.7665,
    longitude: -122.4219,
    availableBatteries: 3,
    distance: 2.5,
    isOpen: true,
    operatingHours: '8:00 AM - 10:00 PM',
  },
  {
    id: 'station-3',
    name: 'EcoSwap Station',
    address: '789 Park Ave, Cityville',
    latitude: 37.7834,
    longitude: -122.4252,
    availableBatteries: 0,
    distance: 3.7,
    isOpen: true,
    operatingHours: '7:00 AM - 8:00 PM',
  },
  {
    id: 'station-4',
    name: 'BatteryPlus Exchange',
    address: '101 Tech Blvd, Cityville',
    latitude: 37.7707,
    longitude: -122.4120,
    availableBatteries: 5,
    distance: 4.1,
    isOpen: false,
    operatingHours: '9:00 AM - 7:00 PM',
  },
];

export const userPoints = 325;