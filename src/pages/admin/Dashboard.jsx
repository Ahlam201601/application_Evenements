import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventsList from "./EventsList";
import Orders from "./Orders";
import Login from "./Login";
import { FaCalendarAlt, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("events");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  const handleLogin = (email, password) => {
    if (email === "admin@gmail.com" && password === "12345678") {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/admin", { replace: true });
  };

  if (!isAuthenticated) return <Login onLogin={handleLogin} />;

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Mobile Header */}
      <div className="sm:hidden flex items-center justify-between bg-gray-800 p-4 w-full fixed top-0 z-20">
        <h1 className="text-xl font-bold text-white">
          <span className="text-[#f91942]">Event</span>Sphere
        </h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <FaTimes className="text-white text-2xl" />
          ) : (
            <FaBars className="text-white text-2xl" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 bg-gray-800 border-r border-gray-700 z-10 transform
          sm:translate-x-0 sm:static sm:inset-auto sm:transition-none
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          w-64 flex flex-col
        `}
      >
        {/* Scrollable menu */}
        <div className="flex-1 overflow-y-auto mt-16 sm:mt-0 p-6">
          <h1 className="text-2xl font-bold mb-10 text-white hidden sm:block">
            <span className="text-[#f91942]">Event</span>Sphere Admin
          </h1>

          <nav className="space-y-3">
            <button
              onClick={() => {
                setActiveTab("events");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 text-left p-4 rounded-xl transition ${
                activeTab === "events"
                  ? "bg-linear-to-r from-[#f91942] to-[#ff4d6d] text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <FaCalendarAlt className="text-lg" />
              <span>Events</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("orders");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 text-left p-4 rounded-xl transition ${
                activeTab === "orders"
                  ? "bg-linear-to-r from-[#f91942] to-[#ff4d6d] text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <FaShoppingBag className="text-lg" />
              <span>Orders</span>
            </button>
          </nav>
        </div>

        {/* Logout button */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-left p-4 rounded-xl bg-red-600 hover:bg-red-700 text-white transition shadow-md"
          >
            <FiLogOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-5 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300 bg-gray-900 min-h-screen pt-20 sm:pt-6">
          {activeTab === "events" && <EventsList />}
          {activeTab === "orders" && <Orders />}
      </div>
    </div>
  );
};

export default Dashboard;
