import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  mockUser,
  mockBins,
  mockContributions,
  mockRewards,
  mockCoupons,
  mockVendorRequests,
  getWeeklyContributions,
  getMonthlyContributions,
  getUserRewards,
  getTotalRewardBalance,
  calculateCO2Reduction
} from '../data/mockData';
import { User, Bin, WasteContribution, Reward, Coupon, VendorRequest } from '../types';

interface DataContextType {
  user: User;
  bins: Bin[];
  weeklyContributions: WasteContribution[];
  monthlyContributions: WasteContribution[];
  rewards: Reward[];
  coupons: Coupon[];
  vendorRequests: VendorRequest[];
  rewardBalance: number;
  co2Reduction: number;
  isLoading: boolean;
  redeemReward: (rewardId: string) => void;
  createVendorRequest: (request: Omit<VendorRequest, 'id' | 'createdAt'>) => void;
  updateBinStatus: (binId: string, status: 'online' | 'offline') => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(mockUser);
  const [bins, setBins] = useState<Bin[]>(mockBins);
  const [weeklyContributions, setWeeklyContributions] = useState<WasteContribution[]>([]);
  const [monthlyContributions, setMonthlyContributions] = useState<WasteContribution[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [coupons] = useState<Coupon[]>(mockCoupons);
  const [vendorRequests, setVendorRequests] = useState<VendorRequest[]>(mockVendorRequests);
  const [rewardBalance, setRewardBalance] = useState<number>(0);
  const [co2Reduction, setCo2Reduction] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Load user data
      const weekly = getWeeklyContributions(user.id);
      const monthly = getMonthlyContributions(user.id);
      const userRewards = getUserRewards(user.id);
      const balance = getTotalRewardBalance(user.id);
      const co2 = calculateCO2Reduction(weekly);
      
      setWeeklyContributions(weekly);
      setMonthlyContributions(monthly);
      setRewards(userRewards);
      setRewardBalance(balance);
      setCo2Reduction(co2);
      setIsLoading(false);
    };
    
    loadData();
  }, [user.id]);

  // Redeem a reward
  const redeemReward = (rewardId: string) => {
    setRewards(prevRewards => 
      prevRewards.map(reward => 
        reward.id === rewardId 
          ? { ...reward, redeemed: true } 
          : reward
      )
    );
    
    // Update reward balance
    setRewardBalance(prevBalance => {
      const redeemedReward = rewards.find(r => r.id === rewardId);
      return redeemedReward ? prevBalance - redeemedReward.amount : prevBalance;
    });
  };

  // Create a new vendor request
  const createVendorRequest = (request: Omit<VendorRequest, 'id' | 'createdAt'>) => {
    const newRequest: VendorRequest = {
      ...request,
      id: `request-${vendorRequests.length + 1}`,
      createdAt: new Date().toISOString()
    };
    
    setVendorRequests(prevRequests => [...prevRequests, newRequest]);
  };

  // Update bin status
  const updateBinStatus = (binId: string, status: 'online' | 'offline') => {
    setBins(prevBins => 
      prevBins.map(bin => 
        bin.id === binId 
          ? { ...bin, status, lastSynced: new Date().toISOString() } 
          : bin
      )
    );
  };

  const value = {
    user,
    bins,
    weeklyContributions,
    monthlyContributions,
    rewards,
    coupons,
    vendorRequests,
    rewardBalance,
    co2Reduction,
    isLoading,
    redeemReward,
    createVendorRequest,
    updateBinStatus
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};