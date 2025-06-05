import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Gift, ExternalLink } from 'lucide-react';

interface RedeemModalProps {
  amount: number;
  onClose: () => void;
}

const RedeemModal: React.FC<RedeemModalProps> = ({ amount, onClose }) => {
  // Generate random QR code URL from placeholder service
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=AuraSort-Coupon-${amount}-${Date.now()}`;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#27354a] to-[#121b2f] rounded-lg max-w-md w-full p-6 relative border border-[#27354a]/30">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-300"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <Gift className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">Redeem Rs. {amount} Coupon</h3>
          <p className="mt-2 text-sm text-gray-500">
            Scan this QR code or show it to the cashier to redeem your discount.
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
          
          <div className="mt-5">
            <button
              type="button"
              className="btn-primary w-full"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RewardSummaryCard: React.FC = () => {
  const { rewards, rewardBalance } = useData();
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState(0);
  
  // Get recent rewards (last 3)
  const recentRewards = [...rewards]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .filter(reward => !reward.redeemed)
    .slice(0, 3);
  
  const handleRedeemClick = (amount: number) => {
    setRedeemAmount(amount);
    setIsRedeemModalOpen(true);
  };

  return (
    <div className="p-4 bg-gradient-to-br from-[#27354a] to-[#121b2f] rounded-lg shadow-lg border border-[#27354a]/30">
      <div className="flex items-center mb-4">
        <Gift className="h-5 w-5 text-gray-400 mr-2" />
        <h2 className="text-lg font-bold text-white">Reward Summary</h2>
      </div>
      
      <div className="p-4 bg-[#1a1625] rounded-lg mb-5 border border-[#27354a]/30">
        <p className="text-sm text-gray-300">Current Balance</p>
        <p className="text-2xl font-bold text-white">Rs. {rewardBalance.toFixed(2)}</p>
      </div>
      
      <h3 className="text-sm font-medium text-gray-500 mb-3">Recent Rewards</h3>
      {recentRewards.length > 0 ? (
        <div className="space-y-2">
          {recentRewards.map((reward) => (
            <div key={reward.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 bg-waste-${reward.wasteType}`}></div>
                <span className="text-sm">{reward.wasteType.charAt(0).toUpperCase() + reward.wasteType.slice(1)}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium">Rs. {reward.amount}</span>
                <span className="text-xs text-gray-500 ml-2">
                  {new Date(reward.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-4">No recent rewards.</p>
      )}
      
      {rewardBalance > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Redeem Options</h3>
          <div className="grid grid-cols-3 gap-2">
            {[20, 50, 100].map((amount) => (
              <button
                key={amount}
                className={`btn ${rewardBalance >= amount ? 'btn-accent' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                disabled={rewardBalance < amount}
                onClick={() => handleRedeemClick(amount)}
              >
                Rs. {amount}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 text-center">
        <a href="/rewards" className="inline-flex items-center text-sm text-primary-600 hover:text-primary-800">
          View all rewards
          <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </div>
      
      {isRedeemModalOpen && (
        <RedeemModal 
          amount={redeemAmount} 
          onClose={() => setIsRedeemModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default RewardSummaryCard;