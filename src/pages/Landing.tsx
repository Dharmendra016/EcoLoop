import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0c111b] text-white font-sans">
      {/* Navbar */}
<nav className="flex justify-between items-center p-6 bg-[#101722] shadow-[0_6px_20px_rgba(0,0,0,0.7)] backdrop-blur-md border-b border-[#1f2937]/60 z-50 relative">
  <div className="text-2xl font-extrabold tracking-wide text-green-400 drop-shadow-[0_0_6px_#22c55e]">
    SmartWaste
  </div>
  <div className="space-x-4">
    <button
      onClick={() => navigate('/signin')}
      className="px-5 py-2 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black rounded-lg shadow-md hover:shadow-lg transition"
    >
      Sign In
    </button>
    <button
      onClick={() => navigate('/register')}
      className="px-5 py-2 bg-green-400 text-black hover:bg-green-300 rounded-lg shadow-md hover:shadow-lg transition"
    >
      Get Started
    </button>
  </div>
</nav>



      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 md:px-24 py-24 text-center bg-gradient-to-b from-[#121826] to-[#0c111b]">
        <h1 className="text-4xl md:text-6xl font-extrabold max-w-4xl leading-tight mb-6">
          Digitizing Waste Management for Smarter Cities
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10">
          SmartWaste is an AI + IoT solution designed to help governments modernize waste sorting, streamline municipal operations, and collaborate efficiently with recyclers — all on one unified platform.
        </p>
        <button
          onClick={() => navigate('/register')}
          className="px-8 py-3 bg-green-400 text-black text-lg rounded-full shadow-lg hover:bg-green-300 transition"
        >
          Request Demo
        </button>
      </section>

      {/* Impact Section */}
      <section className="px-6 md:px-20 py-20 bg-[#0c111b] text-center">
        <h2 className="text-3xl font-bold mb-12">Empowering Smart Municipalities</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-[#1a202c] p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold text-green-400 mb-2">Real-Time Waste Analytics</h3>
            <p className="text-gray-400">Monitor household waste patterns across zones for informed policy and pickup routes.</p>
          </div>
          <div className="bg-[#1a202c] p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold text-green-400 mb-2">AI-Driven Sorting</h3>
            <p className="text-gray-400">Bins auto-detect waste type using AI, ensuring faster and more accurate segregation.</p>
          </div>
          <div className="bg-[#1a202c] p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold text-green-400 mb-2">Seamless Collaboration</h3>
            <p className="text-gray-400">Governments, citizens, and recyclers sync operations via a single platform with full traceability.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#121826] text-center text-gray-500 py-6 border-t border-gray-700">
        &copy; {new Date().getFullYear()} SmartWaste | Built for Impact.
      </footer>
    </div>
  );
}
