import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  WasteContribution, 
  WASTE_LABELS, 
  WASTE_COLORS, 
  CO2_MULTIPLIERS,
  WATER_MULTIPLIERS 
} from '../../types';

interface ImpactChartsProps {
  contributions: WasteContribution[];
}

const ImpactCharts: React.FC<ImpactChartsProps> = ({ contributions }) => {
  // Prepare data for monthly contribution chart
  const prepareMonthlyData = () => {
    // Group contributions by month and type
    const monthlyData: Record<string, Record<string, number>> = {};
    
    contributions.forEach(contribution => {
      const date = new Date(contribution.timestamp);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = {};
      }
      
      const { wasteType, weight } = contribution;
      monthlyData[monthYear][wasteType] = (monthlyData[monthYear][wasteType] || 0) + weight;
    });
    
    // Convert to array format for recharts
    return Object.entries(monthlyData)
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .map(([date, typeData]) => {
        const [year, month] = date.split('-');
        const displayDate = `${new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'short' })} ${year}`;
        
        return {
          name: displayDate,
          ...Object.entries(typeData).reduce((acc, [type, weight]) => ({
            ...acc,
            [WASTE_LABELS[type as keyof typeof WASTE_LABELS]]: parseFloat(weight.toFixed(2))
          }), {})
        };
      });
  };
  
  // Prepare data for environmental impact timeline
  const prepareImpactData = () => {
    // Group contributions by date
    const dailyContributions: Record<string, WasteContribution[]> = {};
    
    contributions.forEach(contribution => {
      const date = new Date(contribution.timestamp).toISOString().split('T')[0];
      
      if (!dailyContributions[date]) {
        dailyContributions[date] = [];
      }
      
      dailyContributions[date].push(contribution);
    });
    
    // Calculate cumulative impact
    let cumulativeWaste = 0;
    let cumulativeCO2 = 0;
    let cumulativeWater = 0;
    
    return Object.entries(dailyContributions)
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .map(([date, dailyContribs]) => {
        // Calculate daily impact
        const dailyWaste = dailyContribs.reduce((sum, c) => sum + c.weight, 0);
        
        const dailyCO2 = dailyContribs.reduce((sum, c) => {
          return sum + (c.weight * CO2_MULTIPLIERS[c.wasteType]);
        }, 0);
        
        const dailyWater = dailyContribs.reduce((sum, c) => {
          return sum + (c.weight * WATER_MULTIPLIERS[c.wasteType]);
        }, 0);
        
        // Update cumulative values
        cumulativeWaste += dailyWaste;
        cumulativeCO2 += dailyCO2;
        cumulativeWater += dailyWater;
        
        const displayDate = new Date(date).toLocaleDateString('default', { 
          month: 'short', 
          day: 'numeric' 
        });
        
        return {
          name: displayDate,
          date,
          waste: parseFloat(cumulativeWaste.toFixed(2)),
          co2: parseFloat(cumulativeCO2.toFixed(2)),
          water: parseFloat(cumulativeWater.toFixed(2))
        };
      });
  };
  
  const monthlyData = prepareMonthlyData();
  const impactData = prepareImpactData();

  return (
    <div className="space-y-8">
      <div className="p-4 bg-gradient-to-br from-[#27354a] to-[#121b2f] rounded-lg shadow-lg border border-[#27354a]/30">
        <h3 className="text-lg font-bold text-white mb-4">Monthly Waste Contribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#27354a" />
              <XAxis dataKey="name" stroke="#92AAD1" />
              <YAxis label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }} stroke="#92AAD1" />
              <Tooltip />
              <Legend />
              {Object.entries(WASTE_LABELS).map(([type, label]) => (
                <Bar 
                  key={type} 
                  dataKey={label} 
                  stackId="a" 
                  fill={WASTE_COLORS[type as keyof typeof WASTE_COLORS]} 
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="p-4 bg-gradient-to-br from-[#27354a] to-[#121b2f] rounded-lg shadow-lg border border-[#27354a]/30">
        <h3 className="text-lg font-bold text-white mb-4">Environmental Impact Timeline</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={impactData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" label={{ value: 'Waste (kg)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'CO₂ (kg)', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="waste" 
                name="Total Waste" 
                stroke="#92AAD1" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="co2" 
                name="CO₂ Saved" 
                stroke="#22c55e" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ImpactCharts;