import React, { useState } from 'react';
import { Reward, WASTE_LABELS, WASTE_COLORS } from '../../types';
import { History, ChevronDown, ChevronUp } from 'lucide-react';

interface RewardHistoryProps {
  rewards: Reward[];
}

const RewardHistory: React.FC<RewardHistoryProps> = ({ rewards }) => {
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [sortBy, setSortBy] = useState<'timestamp' | 'amount' | 'wasteType'>('timestamp');
  
  // Sort rewards
  const sortedRewards = [...rewards].sort((a, b) => {
    if (sortBy === 'timestamp') {
      return sortOrder === 'desc'
        ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        : new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    } else if (sortBy === 'amount') {
      return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
    } else {
      return sortOrder === 'desc'
        ? b.wasteType.localeCompare(a.wasteType)
        : a.wasteType.localeCompare(b.wasteType);
    }
  });
  
  // Handle sort click
  const handleSortClick = (column: 'timestamp' | 'amount' | 'wasteType') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };
  
  // Get sort icon
  const getSortIcon = (column: 'timestamp' | 'amount' | 'wasteType') => {
    if (sortBy !== column) return null;
    return sortOrder === 'desc' ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />;
  };

  return (
    <div className="card mt-6">
      <div className="flex items-center mb-6">
        <History className="h-5 w-5 text-primary-500 mr-2" />
        <h2 className="text-lg font-bold text-gray-800">Reward History</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick('timestamp')}
              >
                <div className="flex items-center">
                  Date
                  {getSortIcon('timestamp')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick('wasteType')}
              >
                <div className="flex items-center">
                  Waste Type
                  {getSortIcon('wasteType')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick('amount')}
              >
                <div className="flex items-center">
                  Reward (Rs.)
                  {getSortIcon('amount')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedRewards.length > 0 ? (
              sortedRewards.map((reward) => (
                <tr key={reward.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(reward.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: WASTE_COLORS[reward.wasteType] }}
                      ></div>
                      <span className="text-sm font-medium text-gray-900">
                        {WASTE_LABELS[reward.wasteType]}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {reward.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      reward.redeemed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {reward.redeemed ? 'Redeemed' : 'Available'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No reward history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RewardHistory;