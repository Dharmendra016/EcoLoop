import React, { useState } from 'react';
import { WASTE_TYPES, WASTE_LABELS, VendorRequest } from '../../types';
import { Package, Check } from 'lucide-react';

interface VendorFormProps {
  onSubmit: (request: Omit<VendorRequest, 'id' | 'createdAt'>) => void;
}

const VendorForm: React.FC<VendorFormProps> = ({ onSubmit }) => {
  const [wasteType, setWasteType] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate input
    if (!wasteType) {
      setError('Please select a waste type');
      return;
    }
    
    const quantityNum = parseFloat(quantity);
    if (isNaN(quantityNum) || quantityNum <= 0) {
      setError('Please enter a valid quantity');
      return;
    }
    
    // Submit form
    onSubmit({
      vendorId: 'vendor-001', // Hardcoded for demo
      wasteType: wasteType as any,
      quantity: quantityNum,
      status: 'pending'
    });
    
    // Show success message
    setSubmitted(true);
    
    // Reset form
    setTimeout(() => {
      setWasteType('');
      setQuantity('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="p-4 bg-gradient-to-br from-[#27354a] to-[#121b2f] rounded-lg shadow-lg border border-[#27354a]/30">
      <div className="flex items-center mb-6">
        <Package className="h-5 w-5 text-gray-400 mr-2" />
        <h2 className="text-lg font-bold text-white">Submit Demand</h2>
      </div>
      
      {submitted ? (
        <div className="bg-green-50 p-4 rounded-lg flex items-center fade-in">
          <Check className="h-6 w-6 text-green-500 mr-2" />
          <div>
            <p className="font-medium text-green-800">Request submitted successfully!</p>
            <p className="text-sm text-green-600">Your request has been received and will be processed shortly.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-[#1a1625] text-red-400 rounded-lg text-sm border border-red-400/30">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="waste-type" className="block text-sm font-medium text-gray-300 mb-1">
              Waste Type
            </label>
            <select
              id="waste-type"
              value={wasteType}
              onChange={(e) => setWasteType(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a1625] border border-[#27354a] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#27354a]"
              required
            >
              <option value="">Select waste type</option>
              {WASTE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {WASTE_LABELS[type]}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-1">
              Quantity (kg)
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a1625] border border-[#27354a] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#27354a]"
              placeholder="Enter quantity in kg"
              min="1"
              required
            />
          </div>
          
          <button type="submit" className="w-full px-4 py-2 bg-[#27354a] hover:bg-[#324158] text-white font-medium rounded-md transition-colors duration-200 border border-[#27354a]/30">
            Submit Request
          </button>
        </form>
      )}
    </div>
  );
};

export default VendorForm;