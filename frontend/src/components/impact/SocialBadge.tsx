import React, { useState } from 'react';
import { Share2, Download } from 'lucide-react';
import { WasteContribution, CO2_MULTIPLIERS } from '../../types';

interface SocialBadgeProps {
  contributions: WasteContribution[];
}

const SocialBadge: React.FC<SocialBadgeProps> = ({ contributions }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  // Calculate total waste
  const totalWaste = contributions.reduce((sum, c) => sum + c.weight, 0);
  
  // Calculate CO2 impact
  const co2Saved = contributions.reduce((sum, c) => {
    return sum + (c.weight * CO2_MULTIPLIERS[c.wasteType]);
  }, 0);
  
  // Determine badge level
  const getBadgeLevel = () => {
    if (totalWaste > 20) return { level: 'Eco Master', percentile: '1%', color: '#22c55e' };
    if (totalWaste > 15) return { level: 'Eco Champion', percentile: '5%', color: '#10b981' };
    if (totalWaste > 10) return { level: 'Eco Warrior', percentile: '10%', color: '#34d399' };
    if (totalWaste > 5) return { level: 'Eco Enthusiast', percentile: '25%', color: '#6ee7b7' };
    return { level: 'Eco Starter', percentile: '50%', color: '#a7f3d0' };
  };
  
  const badge = getBadgeLevel();
  
  // Handle share and download
  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };
  
  const handleDownload = () => {
    // In a real app, we would generate an actual image
    // For this demo, we'll just simulate a download
    alert('Badge downloaded successfully!');
  };

  return (
    <div className="p-4 bg-gradient-to-br from-[#27354a] to-[#121b2f] rounded-lg shadow-lg border border-[#27354a]/30">
      <h3 className="text-lg font-bold text-white mb-4">Your Environmental Impact Badge</h3>
      
      <div className="flex flex-col items-center justify-center p-6 border border-[#27354a]/30 rounded-lg bg-[#1a1625]">
        <div 
          className="w-32 h-32 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: `${badge.color}20`, border: `4px solid ${badge.color}` }}
        >
          <span className="text-4xl">🌍</span>
        </div>
        
        <h4 className="text-xl font-bold" style={{ color: badge.color }}>
          {badge.level}
        </h4>
        
        <p className="text-sm text-gray-500 mt-1">
          Top {badge.percentile} of Eco Users
        </p>
        
        <div className="grid grid-cols-2 gap-6 w-full mt-6">
          <div className="text-center">
            <p className="text-sm text-gray-400">Total Waste Sorted</p>
            <p className="text-xl font-bold text-white">{totalWaste.toFixed(1)} kg</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-400">CO₂ Emissions Saved</p>
            <p className="text-xl font-bold text-[#22c55e]">{co2Saved.toFixed(1)} kg</p>
          </div>
        </div>
        
        <div className="flex space-x-4 mt-6">
          <button 
            className="px-4 py-2 bg-[#27354a] text-white hover:bg-[#324158] rounded-md flex items-center transition-colors duration-200"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
          
          <button 
            className="px-4 py-2 bg-[#1a1625] text-gray-300 hover:bg-[#27354a] hover:text-white rounded-md flex items-center transition-colors duration-200"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </button>
        </div>
        
        {showShareOptions && (
          <div className="mt-4 p-3 bg-[#1a1625] rounded-lg w-full fade-in border border-[#27354a]/30">
            <p className="text-sm font-medium text-white mb-2">Share on:</p>
            <div className="flex space-x-4 justify-center">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map(platform => (
                <button 
                  key={platform}
                  className="px-3 py-1 text-xs rounded bg-[#27354a] text-white border border-[#27354a] hover:bg-[#324158]"
                  onClick={() => alert(`Sharing to ${platform}...`)}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialBadge;