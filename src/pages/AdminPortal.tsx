import React from 'react';
import { useData } from '../context/DataContext';
import AdminDashboard from '../components/admin/AdminDashboard';
import { Loader } from 'lucide-react';

const AdminPortal: React.FC = () => {
  const { bins, monthlyContributions, isLoading } = useData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-8 w-8 text-[#3d2f8e] animate-spin" />
        <span className="ml-2 text-gray-300">Loading admin data...</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#211d2d] rounded-lg">
      <AdminDashboard 
        bins={bins}
        contributions={monthlyContributions}
      />
    </div>
  );
};

export default AdminPortal;