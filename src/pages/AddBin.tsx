import { useState } from 'react';
import MapSelectorModal from './MapSelectorModal';

const AddBin = () => {
  const [binId, setBinId] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null);

  const handleAddBin = async () => {
    setStatus('');
    setError('');

    if (!binId.trim()) {
      setError('Bin ID is required');
      return;
    }

    const latitude = selectedCoords?.lat;
    const longitude = selectedCoords?.lng;

    if (!latitude || !longitude) {
      setError('Please select a location on the map.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/bins/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ binId, latitude, longitude }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to add bin');
        return;
      }

      setStatus('Bin added successfully at selected location!');
      setBinId('');
      setSelectedCoords(null);
    } catch (err) {
      console.error(err);
      setError('Server error. Try again later.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-[#121b2f] text-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Add a New Bin</h2>
      <input
        type="text"
        placeholder="Enter Bin ID"
        value={binId}
        onChange={(e) => setBinId(e.target.value)}
        className="w-full mb-4 px-4 py-2 bg-[#1a1625] border border-[#27354a] text-white rounded"
      />
      <button
        onClick={() => setModalOpen(true)}
        className="w-full mb-2 py-2 bg-purple-600 rounded hover:bg-purple-700 transition"
      >
        Show Bin Location on Map
      </button>
      <button
        onClick={handleAddBin}
        className="w-full py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
      >
        Add Bin
      </button>
      {selectedCoords && (
        <p className="mt-2 text-sm text-gray-300">
          Selected Location: {selectedCoords.lat.toFixed(5)}, {selectedCoords.lng.toFixed(5)}
        </p>
      )}
      {status && <p className="mt-4 text-green-400">{status}</p>}
      {error && <p className="mt-4 text-red-400">{error}</p>}

      {modalOpen && (
        <MapSelectorModal
          onClose={() => setModalOpen(false)}
          onConfirm={(position: L.LatLng | null) => {
            if (position) {
              setSelectedCoords({ lat: position.lat, lng: position.lng });
            } else {
              setSelectedCoords(null);
            }
          }}
        />
      )}
    </div>
  );
};

export default AddBin;
