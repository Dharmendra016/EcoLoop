import React from 'react';
import { Filter, BarChart3, AlertTriangle } from 'lucide-react';
import { WASTE_TYPES, WASTE_LABELS } from '../../types';

interface BinFilterControlsProps {
  selectedWasteType: string | null;
  showHighFill: boolean;
  onWasteTypeChange: (type: string | null) => void;
  onHighFillChange: (show: boolean) => void;
}

const BinFilterControls: React.FC<BinFilterControlsProps> = ({ 
  selectedWasteType,
  showHighFill,
  onWasteTypeChange,
  onHighFillChange
}) => {
  return (
    <div className="p-4 bg-gradient-to-br from-[#27354a] to-[#121b2f] rounded-lg shadow-lg border border-[#27354a]/30 mb-4">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-gray-400 mr-2" />
        <h2 className="text-lg font-bold text-white">Filter Bins</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Waste type filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
            <BarChart3 className="h-4 w-4 mr-1 text-gray-400" />
            Waste Type
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <button
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                selectedWasteType === null ? 'bg-[#27354a] text-white' : 'bg-[#1a1625] text-gray-300 hover:bg-[#27354a] hover:text-white'
              }`}
              onClick={() => onWasteTypeChange(null)}
            >
              All
            </button>
            
            {WASTE_TYPES.map(type => (
              <button
                key={type}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  selectedWasteType === type ? 'bg-[#27354a] text-white' : 'bg-[#1a1625] text-gray-300 hover:bg-[#27354a] hover:text-white'
                }`}
                onClick={() => onWasteTypeChange(type)}
              >
                {WASTE_LABELS[type]}
              </button>
            ))}
          </div>
        </div>
        
        {/* Fill level filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-1" />
            Fill Level
          </h3>
          <button
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              showHighFill ? 'bg-[#27354a] text-white' : 'bg-[#1a1625] text-gray-300 hover:bg-[#27354a] hover:text-white'
            }`}
            onClick={() => onHighFillChange(!showHighFill)}
          >
            Show bins with &gt;80% fill
          </button>
        </div>
      </div>
    </div>
  );
};

export default BinFilterControls;