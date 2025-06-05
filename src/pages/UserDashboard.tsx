import React from 'react';
import { useData } from '../context/DataContext';
import WasteContributionCard from '../components/dashboard/WasteContributionCard';
import RewardSummaryCard from '../components/dashboard/RewardSummaryCard';
import { Loader } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { weeklyContributions, co2Reduction, isLoading } = useData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-8 w-8 text-[#27354a] animate-spin" />
        <span className="ml-2 text-gray-300">Loading dashboard data...</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gradient-to-br from-[#27354a] to-[#121b2f] rounded-lg shadow-lg border border-[#27354a]/30">
      <WasteContributionCard 
        contributions={weeklyContributions}
        co2Reduction={co2Reduction}
      />
      <RewardSummaryCard />
    </div>
  );
};

export default UserDashboard;