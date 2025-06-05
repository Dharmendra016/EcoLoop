import React, { useState } from 'react';
import { Coupon } from '../../types';
import { Gift, Check, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface CouponListProps {
  coupons: Coupon[];
}

interface RedeemModalProps {
  coupon: Coupon;
  onClose: () => void;
  onRedeem: () => void;
}

const RedeemModal: React.FC<RedeemModalProps> = ({ coupon, onClose, onRedeem }) => {
  // Generate random QR code URL from placeholder service
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=AuraSort-Coupon-${coupon.id}-${Date.now()}`;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative fade-in">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-500"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <Gift className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">Redeem {coupon.name}</h3>
          <p className="mt-2 text-sm text-gray-500">
            {coupon.description}
          </p>
          
          <div className="mt-4 flex justify-center">
            <img src={qrCodeUrl} alt="QR Code" className="h-48 w-48" />
          </div>
          
          <div className="mt-5">
            <p className="text-sm font-medium text-gray-500">Valid for payment via:</p>
            <div className="mt-2 flex justify-center space-x-4">
              <div className="flex items-center">
                <span className="text-sm font-medium">Khalti</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium">eSewa</span>
              </div>
            </div>
          </div>
          
          <div className="mt-5 grid grid-cols-2 gap-4">
            <button
              type="button"
              className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onRedeem();
                onClose();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CouponList: React.FC<CouponListProps> = ({ coupons }) => {
  const { rewardBalance } = useData();
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  
  const handleRedeemClick = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };
  
  const handleRedeem = () => {
    // In a real app, this would call a function to redeem the coupon
    alert(`Coupon ${selectedCoupon?.name} redeemed successfully!`);
  };

  return (
    <div className="card">
      <div className="flex items-center mb-6">
        <Gift className="h-5 w-5 text-primary-500 mr-2" />
        <h2 className="text-lg font-bold text-gray-800">Redeemable Coupons</h2>
      </div>
      
      <div className="mb-4 p-4 bg-accent-50 rounded-lg">
        <p className="text-sm text-gray-500">Current Balance</p>
        <p className="text-2xl font-bold text-accent-600">Rs. {rewardBalance.toFixed(2)}</p>
      </div>
      
      <div className="space-y-4">
        {coupons.map((coupon) => {
          const isRedeemable = rewardBalance >= coupon.requiredPoints;
          
          return (
            <div 
              key={coupon.id} 
              className={`p-4 border rounded-lg ${
                isRedeemable ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-900">{coupon.name}</h3>
                  <p className="text-sm text-gray-500">{coupon.description}</p>
                  <div className="mt-1 flex items-center">
                    <span className="text-xs font-medium text-gray-500">
                      Required points: {coupon.requiredPoints}
                    </span>
                    {isRedeemable && (
                      <span className="ml-2 flex items-center text-xs text-green-600">
                        <Check className="h-3 w-3 mr-1" />
                        Available
                      </span>
                    )}
                  </div>
                </div>
                
                <button
                  className={`btn ${
                    isRedeemable ? 'btn-accent' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!isRedeemable}
                  onClick={() => isRedeemable && handleRedeemClick(coupon)}
                >
                  Redeem
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {selectedCoupon && (
        <RedeemModal
          coupon={selectedCoupon}
          onClose={() => setSelectedCoupon(null)}
          onRedeem={handleRedeem}
        />
      )}
    </div>
  );
};

export default CouponList;