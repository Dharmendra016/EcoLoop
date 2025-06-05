import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Bin, WASTE_COLORS, WASTE_LABELS } from '../../types';

interface BinMapProps {
  bins: Bin[];
}

const BinMap: React.FC<BinMapProps> = ({ bins }) => {
  // Custom icons for bins
  const binIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3121/3121583.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
  
  const offlineBinIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3121/3121615.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  // Calculate center of map based on bin locations
  const getMapCenter = () => {
    if (bins.length === 0) return [27.7172, 85.3240]; // Default to Kathmandu
    
    const lats = bins.map(bin => bin.location.lat);
    const lngs = bins.map(bin => bin.location.lng);
    
    const avgLat = lats.reduce((a, b) => a + b, 0) / lats.length;
    const avgLng = lngs.reduce((a, b) => a + b, 0) / lngs.length;
    
    return [avgLat, avgLng];
  };

  return (
    <div className="h-[500px] rounded-xl overflow-hidden shadow-lg border border-[#27354a]/30">
      <MapContainer 
        center={getMapCenter() as [number, number]} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {bins.map(bin => (
          <Marker
            key={bin.id}
            position={[bin.location.lat, bin.location.lng]}
            icon={bin.status === 'online' ? binIcon : offlineBinIcon}
          >
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-medium text-[#27354a]">{bin.name}</h3>
                <p className="text-sm text-gray-600">{bin.location.address}</p>
                
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-[#27354a]">Status:</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${bin.status === 'online' ? 'bg-[#27354a]/20 text-[#27354a]' : 'bg-red-100 text-red-800'}`}>
                      {bin.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Last synced: {new Date(bin.lastSynced).toLocaleString()}
                  </div>
                </div>
                
                <div className="mt-3">
                  <h4 className="text-xs font-medium text-gray-700 mb-1">Fill Levels</h4>
                  <div className="space-y-2">
                    {Object.entries(bin.fillLevels).map(([type, level]) => (
                      <div key={type}>
                        <div className="flex items-center justify-between text-xs">
                          <span>{WASTE_LABELS[type as keyof typeof WASTE_LABELS]}</span>
                          <span>{level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className="h-1.5 rounded-full" 
                            style={{ 
                              width: `${level}%`,
                              backgroundColor: WASTE_COLORS[type as keyof typeof WASTE_COLORS]
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BinMap;