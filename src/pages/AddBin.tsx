import React, { useState } from 'react';
import axios from 'axios';

const AddBin = () => {
  const [binId, setBinId] = useState('');
  const [location, setLocation] = useState('');
  const [binUserId, setBinUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/bins/add', {
        binId,
        location,
        binUserId,
      });

      setMessage(res.data.message);
      setBinId('');
      setLocation('');
      setBinUserId('');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Error adding bin');
    }
  };

  return (    <div className="max-w-xl mx-auto mt-10">
      <div className="bg-gradient-to-br from-[#27354a] to-[#121b2f] shadow-lg rounded-2xl p-6 border border-[#27354a]/30">
        <h2 className="text-2xl font-bold mb-6 text-white">Add New Bin</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>            <label htmlFor="binId" className="block text-sm font-medium text-gray-300 mb-1">
              Bin ID
            </label>
            <input
              id="binId"
              value={binId}
              onChange={(e) => setBinId(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#1a1625] border border-[#27354a] text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#27354a]"
            />
          </div>

          <div>            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
              Location
            </label>
            <input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#1a1625] border border-[#27354a] text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#27354a]"
            />
          </div>

          <div>            <label htmlFor="binUserId" className="block text-sm font-medium text-gray-300 mb-1">
              Bin User ID
            </label>
            <input
              id="binUserId"
              value={binUserId}
              onChange={(e) => setBinUserId(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#1a1625] border border-[#27354a] text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#27354a]"
            />
          </div>          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#27354a] to-[#121b2f] hover:from-[#324158] hover:to-[#1a2438] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 border border-[#27354a]/30"
          >
            Add Bin
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AddBin;
