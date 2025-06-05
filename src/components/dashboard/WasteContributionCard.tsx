import React from 'react';
import { WasteContribution, WASTE_LABELS, WASTE_COLORS, CO2_MULTIPLIERS } from '../../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Recycle } from 'lucide-react';

interface WasteContributionCardProps {
  contributions: WasteContribution[];
  co2Reduction: number;
}

const WasteContributionCard: React.FC<WasteContributionCardProps> = ({ contributions, co2Reduction }) => {
  // Process data for pie chart
  const processDataForPieChart = () => {
    const wasteTypeAmounts: Record<string, number> = {};
    
    // Sum up weights by waste type
    contributions.forEach(contribution => {
      const { wasteType, weight } = contribution;
      wasteTypeAmounts[wasteType] = (wasteTypeAmounts[wasteType] || 0) + weight;
    });
    
    // Convert to array format for recharts
    return Object.entries(wasteTypeAmounts).map(([wasteType, weight]) => ({
      name: WASTE_LABELS[wasteType as keyof typeof WASTE_LABELS],
      value: parseFloat(weight.toFixed(2)),
      color: WASTE_COLORS[wasteType as keyof typeof WASTE_COLORS]
    }));
  };

  const pieChartData = processDataForPieChart();
  
  // Calculate total waste
  const totalWaste = contributions.reduce((total, contribution) => total + contribution.weight, 0);

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1625] p-2 border border-[#27354a]/30 rounded shadow-sm">
          <p className="font-medium text-white">{payload[0].name}</p>
          <p className="text-sm text-gray-300">{payload[0].value} kg</p>
          <p className="text-xs text-gray-400">
            {((payload[0].value / totalWaste) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 bg-gradient-to-br from-[#27354a] to-[#121b2f] rounded-lg shadow-lg border border-[#27354a]/30">
      <div className="flex items-center mb-4">
        <Recycle className="h-5 w-5 text-gray-400 mr-2" />
        <h2 className="text-lg font-bold text-white">My Waste Contributions</h2>
      </div>
      
      {contributions.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Waste Type Breakdown</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    labelLine={false}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="space-y-4">
                <div className="p-4 bg-[#1a1625] rounded-lg border border-[#27354a]/30">
                  <p className="text-sm text-gray-300">Total Waste Sorted</p>
                  <p className="text-2xl font-bold text-white">{totalWaste.toFixed(2)} kg</p>
                </div>
                
                <div className="p-4 bg-[#1a1625] rounded-lg border border-[#27354a]/30">
                  <p className="text-sm text-gray-500">CO₂ Emissions Reduced</p>
                  <p className="text-2xl font-bold text-green-600">{co2Reduction.toFixed(2)} kg</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 border-t border-gray-100 pt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Recent Contributions</h3>
            <div className="space-y-2">
              {contributions.slice(0, 3).map((contribution) => (
                <div key={contribution.id} className="flex items-center justify-between p-2 bg-[#1a1625] rounded border border-[#27354a]/30">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: WASTE_COLORS[contribution.wasteType] }}
                    ></div>
                    <span className="text-sm font-medium text-white">{WASTE_LABELS[contribution.wasteType]}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-300">{contribution.weight.toFixed(2)} kg</span>
                    <span className="text-xs text-gray-400 ml-2">
                      {new Date(contribution.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-gray-500">No contributions yet.</p>
          <p className="text-sm text-gray-400 mt-2">Start recycling to see your impact!</p>
        </div>
      )}
    </div>
  );
};

export default WasteContributionCard;