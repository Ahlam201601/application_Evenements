import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventsList from "./EventsList";
import Orders from "./Orders";
import Login from "./Login";
import { FaCalendarAlt, FaShoppingBag } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("events");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (email, password) => {
    if (email === 'admin@gmail.com' && password === '12345678') {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  };

  // If not authenticated, show login
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // If authenticated, show dashboard
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-slate-700 fixed inset-y-0 left-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-10 text-white">
            <span className="text-indigo-400">Event</span>Sphere Admin
          </h1>
          
          <nav className="space-y-3">
            <button
              onClick={() => setActiveTab("events")}
              className={`w-full flex items-center gap-3 text-left p-4 rounded-lg transition ${
                activeTab === "events"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-700"
              }`}
            >
              <FaCalendarAlt className="text-lg" />
              <span>Events</span>
            </button>
            
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-3 text-left p-4 rounded-lg transition ${
                activeTab === "orders"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-700"
              }`}
            >
              <FaShoppingBag className="text-lg" />
              <span>Orders</span>
            </button>
          </nav>

          {/* LOGOUT BUTTON */}
          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 text-left p-4 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
            >
              <FiLogOut className="text-lg" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 overflow-auto">
        <div className="p-6 sm:p-8">
          {activeTab === "events" && <EventsList />}
          {activeTab === "orders" && <Orders />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;