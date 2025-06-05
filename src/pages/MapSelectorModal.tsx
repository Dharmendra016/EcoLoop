import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for marker icon issues in Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

interface MapSelectorModalProps {
  onClose: () => void;
  onConfirm: (position: L.LatLng | null) => void;
}

const MapSelectorModal: React.FC<MapSelectorModalProps> = ({ onClose, onConfirm }) => {
  const dummyLocation = new L.LatLng(27.7, 85.3);

  useEffect(() => {
    // Auto-select the dummy location on load
    onConfirm(dummyLocation);
  }, [onConfirm]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded w-[90%] md:w-[600px] h-[500px] relative">
        <h2 className="text-xl font-bold mb-2 text-black">Map Preview</h2>
        <MapContainer center={dummyLocation} zoom={13} style={{ height: '80%', borderRadius: '8px' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={dummyLocation} />
        </MapContainer>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapSelectorModal;
