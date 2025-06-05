import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default role

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate login validation
    console.log({ email, password, role });

    localStorage.setItem("role", role);
      

    // Redirect based on role
    switch (role) { 
      case 'user':
        navigate('/userdashboard');
        break;
      case 'vendor':
        navigate('/vendor');
        break;
      case 'authority':
        navigate('/admin');
        break;
      default:
        navigate('/');
    }
  };

  return (    <div className="min-h-screen flex items-center justify-center bg-[#121b2f]">
      <div className="bg-gradient-to-br from-[#27354a] to-[#121b2f] p-8 rounded-xl shadow-lg border border-[#27354a]/30 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>            <label className="block mb-1 text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a1625] border border-[#27354a] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#27354a]"
            />
          </div>

          <div>            <label className="block mb-1 text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a1625] border border-[#27354a] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#27354a]"
            />
          </div>

          <div>            <label className="block mb-1 text-sm font-medium text-gray-300">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a1625] border border-[#27354a] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#27354a]"
            >
              <option value="user">User</option>
              <option value="vendor">Vendor</option>
              <option value="authority">Authority</option>
            </select>
          </div>          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#27354a] to-[#121b2f] hover:from-[#324158] hover:to-[#1a2438] text-white font-medium py-2 rounded-md transition-colors duration-200 border border-[#27354a]/30"
          >
            Sign In          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{' '}
          <button onClick={() => navigate('/register')} className="text-white hover:underline">
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
