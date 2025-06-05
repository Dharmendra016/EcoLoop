import { 
  User, 
  Bin, 
  WasteContribution, 
  Reward, 
  Coupon, 
  VendorRequest,
  WasteType 
} from '../types';

// Helper to generate dates
const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

// Generate random waste contributions
export const generateWasteContributions = (userId: string, count: number): WasteContribution[] => {
  const wasteTypes: WasteType[] = ['organic', 'plastic', 'glass', 'metal', 'paper', 'ewaste'];
  const binIds = ['bin-001', 'bin-002', 'bin-003', 'bin-004', 'bin-005'];
  
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 30);
  
  return Array.from({ length: count }, (_, i) => ({
    id: `contribution-${i + 1}`,
    userId,
    wasteType: wasteTypes[Math.floor(Math.random() * wasteTypes.length)],
    weight: parseFloat((Math.random() * 2 + 0.1).toFixed(2)), // 0.1 to 2.1 kg
    timestamp: getRandomDate(startDate, endDate),
    binId: binIds[Math.floor(Math.random() * binIds.length)]
  }));
};

// Generate rewards based on contributions
export const generateRewards = (
  userId: string, 
  contributions: WasteContribution[]
): Reward[] => {
  return contributions.map((contribution, i) => {
    // Simple reward calculation: weight * multiplier based on waste type
    const multipliers: Record<WasteType, number> = {
      organic: 5,
      plastic: 10,
      glass: 8,
      metal: 15,
      paper: 7,
      ewaste: 25
    };
    
    const amount = Math.round(contribution.weight * multipliers[contribution.wasteType]);
    
    return {
      id: `reward-${i + 1}`,
      userId,
      amount,
      wasteType: contribution.wasteType,
      timestamp: contribution.timestamp,
      redeemed: Math.random() > 0.7 // 30% chance of being redeemed
    };
  });
};

// Mock user
export const mockUser: User = {
  id: 'user-001',
  name: 'Alex Singh',
  email: 'alex.singh@example.com',
  rewardPoints: 240
};

// Mock bins
export const mockBins: Bin[] = [
  {
    id: 'bin-001',
    name: 'Central Park Smart Bin',
    location: {
      lat: 27.7172,
      lng: 85.3240,
      address: 'Central Park, Kathmandu'
    },
    status: 'online',
    lastSynced: new Date().toISOString(),
    fillLevels: {
      organic: 75,
      plastic: 45,
      glass: 30,
      metal: 20,
      paper: 60,
      ewaste: 10
    },
    totalCapacity: {
      organic: 50,
      plastic: 30,
      glass: 20,
      metal: 15,
      paper: 25,
      ewaste: 10
    }
  },
  {
    id: 'bin-002',
    name: 'City Mall Smart Bin',
    location: {
      lat: 27.7120,
      lng: 85.3210,
      address: 'City Mall, New Road'
    },
    status: 'online',
    lastSynced: new Date().toISOString(),
    fillLevels: {
      organic: 90,
      plastic: 85,
      glass: 20,
      metal: 30,
      paper: 70,
      ewaste: 25
    },
    totalCapacity: {
      organic: 60,
      plastic: 40,
      glass: 25,
      metal: 20,
      paper: 30,
      ewaste: 15
    }
  },
  {
    id: 'bin-003',
    name: 'University Campus Bin',
    location: {
      lat: 27.7190,
      lng: 85.3300,
      address: 'Tribhuvan University'
    },
    status: 'offline',
    lastSynced: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 48 hours ago
    fillLevels: {
      organic: 40,
      plastic: 60,
      glass: 10,
      metal: 5,
      paper: 90,
      ewaste: 20
    },
    totalCapacity: {
      organic: 40,
      plastic: 35,
      glass: 15,
      metal: 10,
      paper: 40,
      ewaste: 10
    }
  },
  {
    id: 'bin-004',
    name: 'Thamel Tourist Area Bin',
    location: {
      lat: 27.7152,
      lng: 85.3123,
      address: 'Thamel, Kathmandu'
    },
    status: 'online',
    lastSynced: new Date().toISOString(),
    fillLevels: {
      organic: 85,
      plastic: 90,
      glass: 75,
      metal: 30,
      paper: 45,
      ewaste: 15
    },
    totalCapacity: {
      organic: 70,
      plastic: 60,
      glass: 40,
      metal: 20,
      paper: 30,
      ewaste: 10
    }
  },
  {
    id: 'bin-005',
    name: 'Patan Durbar Square Bin',
    location: {
      lat: 27.6761,
      lng: 85.3256,
      address: 'Patan Durbar Square'
    },
    status: 'online',
    lastSynced: new Date().toISOString(),
    fillLevels: {
      organic: 30,
      plastic: 25,
      glass: 80,
      metal: 10,
      paper: 20,
      ewaste: 5
    },
    totalCapacity: {
      organic: 40,
      plastic: 30,
      glass: 30,
      metal: 15,
      paper: 25,
      ewaste: 10
    }
  }
];

// Mock coupons
export const mockCoupons: Coupon[] = [
  {
    id: 'coupon-001',
    name: 'Rs. 20 Discount',
    description: 'Get Rs. 20 off on your next purchase',
    value: 20,
    requiredPoints: 50
  },
  {
    id: 'coupon-002',
    name: 'Rs. 50 Discount',
    description: 'Get Rs. 50 off on your next purchase',
    value: 50,
    requiredPoints: 100
  },
  {
    id: 'coupon-003',
    name: 'Rs. 100 Discount',
    description: 'Get Rs. 100 off on your next purchase',
    value: 100,
    requiredPoints: 200
  }
];

// Mock vendor requests
export const mockVendorRequests: VendorRequest[] = [
  {
    id: 'request-001',
    vendorId: 'vendor-001',
    wasteType: 'paper',
    quantity: 300,
    status: 'pending',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    id: 'request-002',
    vendorId: 'vendor-001',
    wasteType: 'plastic',
    quantity: 200,
    status: 'fulfilled',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    fulfilledAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
  },
  {
    id: 'request-003',
    vendorId: 'vendor-002',
    wasteType: 'metal',
    quantity: 150,
    status: 'pending',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    id: 'request-004',
    vendorId: 'vendor-002',
    wasteType: 'ewaste',
    quantity: 50,
    status: 'cancelled',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
  }
];

// Generate mock data for the current user
export const mockContributions = generateWasteContributions(mockUser.id, 30);
export const mockRewards = generateRewards(mockUser.id, mockContributions);

// Helper functions to retrieve data
export const getWeeklyContributions = (userId: string): WasteContribution[] => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  return mockContributions.filter(
    c => c.userId === userId && new Date(c.timestamp) >= oneWeekAgo
  );
};

export const getMonthlyContributions = (userId: string): WasteContribution[] => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
  
  return mockContributions.filter(
    c => c.userId === userId && new Date(c.timestamp) >= oneMonthAgo
  );
};

export const getUserRewards = (userId: string): Reward[] => {
  return mockRewards.filter(r => r.userId === userId);
};

export const getTotalRewardBalance = (userId: string): number => {
  const unredeemedRewards = mockRewards.filter(
    r => r.userId === userId && !r.redeemed
  );
  
  return unredeemedRewards.reduce((total, reward) => total + reward.amount, 0);
};

// Calculate CO2 reduction based on waste type and weight
export const calculateCO2Reduction = (contributions: WasteContribution[]): number => {
  const multipliers: Record<WasteType, number> = {
    organic: 0.5,
    plastic: 2.5,
    glass: 0.3,
    metal: 4.0,
    paper: 1.0,
    ewaste: 20.0
  };
  
  return contributions.reduce((total, contribution) => {
    return total + (contribution.weight * multipliers[contribution.wasteType]);
  }, 0);
};