import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Recycle, Map, LineChart, Gift, Settings, Package, Menu, X, User, LogOut } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userDetails, setUserDetails] = useState<{name: string; email: string} | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedEmail = localStorage.getItem('email');
    setRole(storedRole);

    if (storedEmail) {
      // Fetch user details
      fetch(`http://localhost:5000/api/users/details?email=${storedEmail}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUserDetails({ name: data.name, email: data.email });
          }
        })
        .catch(console.error);
    }
  }, []);

  const allNavigation = {
    user: [
      { name: 'User Dashboard', href: '/userdashboard', icon: Recycle },
      { name: 'Bin Network', href: '/bin-network', icon: Map },
      { name: 'Rewards', href: '/rewards', icon: Gift },
    ],
    vendor: [
      { name: 'Vendor Portal', href: '/vendor', icon: Package },
      { name: 'Bin Network', href: '/bin-network', icon: Map },
    ],
    authority: [
      { name: 'Authority Portal', href: '/authority', icon: Settings },
      { name: 'User Impact', href: '/impact', icon: LineChart },
      { name: 'Bin Network', href: '/bin-network', icon: Map },
      { name: 'Add New Bin', href: '/new_bin', icon: Gift },
      { name: 'Vendor demand', href: '/vendordemand', icon: Gift },
    ],
  };

  const navigation = allNavigation[role as keyof typeof allNavigation] || [];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-[#1a1625] pt-16">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2E236C] shadow-lg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <div className="flex items-center -ml-2">
              <Recycle className="h-8 w-8 text-white" />
              <span className="ml-2 text-white text-xl font-bold">Pragya Bin</span>
            </div>

            {/* Right: Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6 mr-2">
              <div className="flex items-center space-x-4">
                {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-white bg-[#3d2f8e] px-3 py-2 rounded-md text-sm font-medium flex items-center'
                      : 'text-gray-300 hover:bg-[#3d2f8e] hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center'
                  }
                >
                  <div className="flex items-center">
                    <item.icon className="h-4 w-4 mr-1" />
                    {item.name}
                  </div>
                </NavLink>
              ))}
              </div>

              {/* User Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center text-gray-300 hover:text-white"
                >
                  <User className="h-5 w-5" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1a1625] rounded-md shadow-lg py-1 border border-[#27354a]/30">
                    {userDetails && (
                      <>
                        <div className="px-4 py-2 text-sm text-gray-300">
                          <p className="font-medium">{userDetails.name}</p>
                          <p className="text-gray-400">{userDetails.email}</p>
                          <p className="text-gray-400 capitalize">{role}</p>
                        </div>
                        <div className="border-t border-[#27354a]/30"></div>
                      </>
                    )}
                    <button
                      onClick={() => {
                        localStorage.removeItem('role');
                        localStorage.removeItem('email');
                        navigate('/signin');
                      }}
                      className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#27354a] flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2E236C]"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#211d2d]">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-white bg-[#3d2f8e] px-3 py-2 rounded-md text-sm font-medium block'
                      : 'text-gray-300 hover:bg-[#3d2f8e] hover:text-white px-3 py-2 rounded-md text-sm font-medium block'
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 bg-[#211d2d] rounded-lg shadow-lg">
          <Outlet />
        </div>
      </main>

      <footer className="bg-[#211d2d]">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-700 pt-6">
            <p className="text-sm text-gray-400 text-center">
              &copy; {new Date().getFullYear()} Pragya Bin. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
