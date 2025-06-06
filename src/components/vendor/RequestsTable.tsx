import React from 'react';
import { VendorRequest, WASTE_LABELS, WASTE_COLORS } from '../../types';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface RequestsTableProps {
  requests: VendorRequest[];
}

const RequestsTable: React.FC<RequestsTableProps> = ({ requests }) => {
  // Sort requests by created date (newest first)
  const sortedRequests = [...requests].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  // Status icon and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { icon: Clock, colorClass: 'text-blue-500', bgClass: 'bg-blue-100' };
      case 'fulfilled':
        return { icon: CheckCircle, colorClass: 'text-green-500', bgClass: 'bg-green-100' };
      case 'cancelled':
        return { icon: XCircle, colorClass: 'text-red-500', bgClass: 'bg-red-100' };
      default:
        return { icon: Clock, colorClass: 'text-gray-500', bgClass: 'bg-gray-100' };
    }
  };

  return (
    <div className="p-4 bg-gradient-to-br from-[#27354a] to-[#121b2f] rounded-lg shadow-lg border border-[#27354a]/30 mt-6">
      <h2 className="text-lg font-bold text-white mb-6">Request History</h2>
      
      {sortedRequests.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#1a1625]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Waste Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity (kg)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fulfilled Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27354a]/30">
              {sortedRequests.map((request) => {
                const { icon: StatusIcon, colorClass, bgClass } = getStatusInfo(request.status);
                
                return (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: WASTE_COLORS[request.wasteType] }}
                        ></div>
                        <span className="text-sm font-medium text-white">
                          {WASTE_LABELS[request.wasteType]}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {request.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgClass} ${colorClass}`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.fulfilledAt 
                        ? new Date(request.fulfilledAt).toLocaleDateString()
                        : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-gray-300">No requests found.</p>
        </div>
      )}
    </div>
  );
};

export default RequestsTable;