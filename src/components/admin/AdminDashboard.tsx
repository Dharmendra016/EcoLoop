import React from 'react';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  XAxis,
  YAxis
} from 'recharts';
import { AlertTriangle, Recycle, BarChart3 } from 'lucide-react';
import { Bin, WasteContribution, WASTE_LABELS, WASTE_COLORS } from '../../types';

interface AdminDashboardProps {
  bins: Bin[];
  contributions: WasteContribution[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ bins, contributions }) => {
  // Calculate offline bins
  const offlineBins = bins.filter(bin => bin.status === 'offline');
  
  // Calculate total waste collected this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const weeklyContributions = contributions.filter(
    c => new Date(c.timestamp) >= oneWeekAgo
  );
  
  const totalWasteCollected = weeklyContributions.reduce(
    (total, c) => total + c.weight, 
    0
  );
  
  // Process waste composition data for pie chart
  const processWasteCompositionData = () => {
    const wasteTypeAmounts: Record<string, number> = {};
    
    weeklyContributions.forEach(contribution => {
      const { wasteType, weight } = contribution;
      wasteTypeAmounts[wasteType] = (wasteTypeAmounts[wasteType] || 0) + weight;
    });
    
    return Object.entries(wasteTypeAmounts).map(([wasteType, weight]) => ({
      name: WASTE_LABELS[wasteType as keyof typeof WASTE_LABELS],
      value: parseFloat(weight.toFixed(2)),
      color: WASTE_COLORS[wasteType as keyof typeof WASTE_COLORS]
    }));
  };
  
  const wasteCompositionData = processWasteCompositionData();
  
  // Calculate fill levels for all bins by waste type
  const calculateBinFillByType = () => {
    const fillByType: Record<string, { available: number; filled: number }> = {};
    
    bins.forEach(bin => {
      Object.entries(bin.fillLevels).forEach(([type, fillPercentage]) => {
        if (!fillByType[type]) {
          fillByType[type] = { available: 0, filled: 0 };
        }
        
        const capacity = bin.totalCapacity[type as keyof typeof bin.totalCapacity];
        const filled = (capacity * fillPercentage) / 100;
        const available = capacity - filled;
        
        fillByType[type].filled += filled;
        fillByType[type].available += available;
      });
    });
    
    return Object.entries(fillByType).map(([type, data]) => ({
      name: WASTE_LABELS[type as keyof typeof WASTE_LABELS],
      filled: parseFloat(data.filled.toFixed(2)),
      available: parseFloat(data.available.toFixed(2)),
      color: WASTE_COLORS[type as keyof typeof WASTE_COLORS]
    }));
  };
  
  const binFillData = calculateBinFillByType();

  return (
    <div className="space-y-6">
      {/* Key stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 rounded-lg bg-gradient-to-r from-[#27354a] to-[#121b2f] shadow-lg border border-[#27354a]/30">
          <p className="text-sm text-gray-300">Total Bins Online</p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-white">
              {bins.length - offlineBins.length}
            </p>
            <p className="text-sm text-gray-400">
              of {bins.length} bins
            </p>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-gradient-to-br from-[#27354a] via-[#1f2937] to-[#121b2f] shadow-lg border border-[#27354a]/30">
          <p className="text-sm text-gray-300">Total Waste Collected</p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-white">
              {totalWasteCollected.toFixed(2)} kg
            </p>
            <p className="text-sm text-gray-400">
              this week
            </p>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-gradient-to-br from-[#27354a] via-[#1f2937] to-[#121b2f] shadow-lg border border-[#27354a]/30">
          <p className="text-sm text-gray-300">Offline Bins</p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-white">
              {offlineBins.length}
            </p>
            <p className="text-sm text-red-400">
              need attention
            </p>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Waste composition */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-[#27354a] to-[#121b2f] shadow-lg border border-[#27354a]/30">
          <div className="flex items-center mb-4">
            <Recycle className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-bold text-white">Waste Composition</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteCompositionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  labelLine={false}
                >
                  {wasteCompositionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Bin capacity */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-[#27354a] to-[#121b2f] shadow-lg border border-[#27354a]/30">
          <div className="flex items-center mb-4">
            <BarChart3 className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-bold text-white">Bin Capacity Status</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={binFillData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Capacity (kg)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="filled" name="Filled" stackId="a" fill="#ef4444" />
                <Bar dataKey="available" name="Available" stackId="a" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Offline bins */}
      {offlineBins.length > 0 && (
        <div className="p-4 rounded-lg bg-gradient-to-br from-[#27354a] to-[#121b2f] shadow-lg border border-[#27354a]/30">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
            <h2 className="text-lg font-bold text-white">Offline Bins</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-[#2E236C]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Bin ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Last Synced
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#211d2d] divide-y divide-gray-700">
                {offlineBins.map((bin) => (
                  <tr key={bin.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                      {bin.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {bin.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {bin.location.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(bin.lastSynced).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;