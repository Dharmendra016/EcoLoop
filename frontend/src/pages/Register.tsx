import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default role
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password, role }),
      });

      const data = await response.json();

      localStorage.setItem("role", data.role);
      navigate(data.redirect);

      if (!response.ok) {
        setError(data.message || 'Registration failed');
        return;
      }

      // Redirect based on backend-provided path
      navigate(data.redirect);
    } catch (err) {
      setError('Server error. Try again later.');
    }
  };

  return (    <div className="min-h-screen flex items-center justify-center bg-[#121b2f]">
      <div className="bg-gradient-to-br from-[#27354a] to-[#121b2f] p-8 rounded-xl shadow-lg border border-[#27354a]/30 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">Create Account</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a1625] border border-[#27354a] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#27354a]"
            />
          </div>
          <div><label className="block mb-1 text-sm font-medium text-gray-300">Email</label>
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
            Register          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{' '}
          <button onClick={() => navigate('/signin')} className="text-white hover:underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
