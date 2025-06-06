import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BinNetwork from './pages/BinNetwork';
import UserImpact from './pages/UserImpact';
import Rewards from './pages/Rewards';
import AdminPortal from './pages/AdminPortal';
import VendorPortal from './pages/VendorPortal';
import { DataProvider } from './context/DataContext';
import UserDashboard from './pages/UserDashboard';
import LandingPage from './pages/Landing';
import Register from './pages/Register';
import Signin from './pages/Signin';
import AddBin from './pages/AddBin';
import AuthorityDemandDashboard from './pages/VendorDemand';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="min-h-screen bg-[#1a1625]">
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>            
              <Route path="/bin-network" element={<BinNetwork />} />
              <Route path="/userdashboard" element={<UserDashboard />} />
              <Route path="/impact" element={<UserImpact />} />
              <Route path="/rewards" element={<Rewards />} /> 
              <Route path="/authority" element={<AdminPortal />} />
              <Route path="/vendor" element={<VendorPortal />} />
              <Route path="/new_bin" element={<AddBin />} />
              <Route path="/new_bin" element={<AddBin />} />
              <Route path="/vendordemand" element={<AuthorityDemandDashboard />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;