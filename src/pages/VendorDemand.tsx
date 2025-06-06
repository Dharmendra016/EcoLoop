import { useEffect, useState } from 'react';

interface BinDemand {
  binId: string;
  location: string;
  demand: string; // e.g., "100kg of Organic Waste"
  createdAt: string;
  vendorEmail: string;
  vendorName: string;
}

const AuthorityDemandDashboard = () => {
  const [demands, setDemands] = useState<BinDemand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dummy demand data
    const dummyDemands: BinDemand[] = [
      {
        binId: 'BIN001',
        location: 'Thamel, Kathmandu',
        demand: '100kg of Organic Waste',
        createdAt: new Date().toISOString(),
        vendorEmail: 'vendor1@example.com',
        vendorName: 'Eco Waste Nepal',
      },
      {
        binId: 'BIN002',
        location: 'Lalitpur Industrial Area',
        demand: '50kg of E-Waste',
        createdAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
        vendorEmail: 'vendor2@example.com',
        vendorName: 'GreenBin Solutions',
      },
      {
        binId: 'BIN003',
        location: 'Baneshwor, Kathmandu',
        demand: '200kg of Plastic Waste',
        createdAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
        vendorEmail: 'vendor3@example.com',
        vendorName: 'WasteAway Pvt. Ltd.',
      },
    ];

    setTimeout(() => {
      setDemands(dummyDemands);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAccept = (binId: string) => {
    alert(`Accepted demand for bin ID: ${binId}`);
  };

  if (loading) {
    return <div className="text-white text-center mt-6">Loading demands...</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto text-white">
      <h2 className="text-2xl font-semibold mb-6">Vendor Waste Demands</h2>
      {demands.length === 0 ? (
        <p className="text-gray-400">No demands available.</p>
      ) : (
        demands.map((demand) => (
          <div
            key={demand.binId}
            className="bg-[#1a1625] border border-[#27354a] rounded p-4 mb-4"
          >
            <p><strong>Vendor:</strong> {demand.vendorName}</p>
            <p><strong>Location:</strong> {demand.location}</p>
            <p><strong>Demand:</strong> {demand.demand}</p>
            <p><strong>Requested At:</strong> {new Date(demand.createdAt).toLocaleString()}</p>
            <button
              onClick={() => handleAccept(demand.binId)}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Accept Demand
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AuthorityDemandDashboard;
