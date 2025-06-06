// Waste Types
export type WasteType = 'organic' | 'plastic' | 'glass' | 'metal' | 'paper' | 'ewaste';

// Waste Contribution Data
export interface WasteContribution {
  id: string;
  userId: string;
  wasteType: WasteType;
  weight: number; // in kg
  timestamp: string; // ISO date string
  binId: string;
}

// Bin Data
export interface Bin {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'online' | 'offline';
  lastSynced: string; // ISO date string
  fillLevels: {
    [key in WasteType]: number; // percentage 0-100
  };
  totalCapacity: {
    [key in WasteType]: number; // in kg
  };
}

// User Data
export interface User {
  id: string;
  name: string;
  email: string;
  rewardPoints: number;
}

// Reward Data
export interface Reward {
  id: string;
  userId: string;
  amount: number; // in Rs.
  wasteType: WasteType;
  timestamp: string; // ISO date string
  redeemed: boolean;
}

// Coupon Data
export interface Coupon {
  id: string;
  name: string;
  description: string;
  value: number; // in Rs.
  requiredPoints: number;
}

// Vendor Request
export interface VendorRequest {
  id: string;
  vendorId: string;
  wasteType: WasteType;
  quantity: number; // in kg
  status: 'pending' | 'fulfilled' | 'cancelled';
  createdAt: string; // ISO date string
  fulfilledAt?: string; // ISO date string
}

// Environmental Impact
export interface EnvironmentalImpact {
  co2Saved: number; // in kg
  waterSaved: number; // in liters
  energySaved: number; // in kWh
}

// Constants
export const WASTE_TYPES: WasteType[] = ['organic', 'plastic', 'glass', 'metal', 'paper', 'ewaste'];

export const WASTE_COLORS: Record<WasteType, string> = {
  organic: '#4ade80',
  plastic: '#38bdf8',
  glass: '#a78bfa',
  metal: '#94a3b8',
  paper: '#fbbf24',
  ewaste: '#fb7185',
};

export const WASTE_LABELS: Record<WasteType, string> = {
  organic: 'Organic',
  plastic: 'Plastic',
  glass: 'Glass',
  metal: 'Metal',
  paper: 'Paper',
  ewaste: 'E-Waste',
};

// Environmental impact multipliers
export const CO2_MULTIPLIERS: Record<WasteType, number> = {
  organic: 0.5, // kg CO2 saved per kg waste
  plastic: 2.5,
  glass: 0.3,
  metal: 4.0,
  paper: 1.0,
  ewaste: 20.0,
};

export const WATER_MULTIPLIERS: Record<WasteType, number> = {
  organic: 1.0, // liters saved per kg waste
  plastic: 90.0,
  glass: 50.0,
  metal: 100.0,
  paper: 60.0,
  ewaste: 200.0,
};