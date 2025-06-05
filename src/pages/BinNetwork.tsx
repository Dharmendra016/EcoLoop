import React from 'react';
import { useData } from '../context/DataContext';
import BinMap from '../components/bin-network/BinMap';
import { Loader } from 'lucide-react';

const BinNetwork: React.FC = () => {
  const { bins, isLoading } = useData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-8 w-8 text-primary-500 animate-spin" />
        <span className="ml-2 text-gray-500">Loading bin network data...</span>
      </div>
    );
  }

  return (
    <div>
      <BinMap bins={bins} />
    </div>
  );
};

export default BinNetwork;