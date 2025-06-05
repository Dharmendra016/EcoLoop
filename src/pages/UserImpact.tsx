import React from 'react';
import { useData } from '../context/DataContext';
import ImpactCharts from '../components/impact/ImpactCharts';
import SocialBadge from '../components/impact/SocialBadge';
import { Loader } from 'lucide-react';

const UserImpact: React.FC = () => {
  const { monthlyContributions, isLoading } = useData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-8 w-8 text-[#27354a] animate-spin" />
        <span className="ml-2 text-gray-300">Loading impact data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 bg-gradient-to-br from-[#27354a] to-[#121b2f] rounded-lg shadow-lg border border-[#27354a]/30">
      <ImpactCharts contributions={monthlyContributions} />
      <SocialBadge contributions={monthlyContributions} />
    </div>
  );
};

export default UserImpact;