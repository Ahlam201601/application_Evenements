import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventsList from "./EventsList";
import Orders from "./Orders";
import { FaCalendarAlt, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("events");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login", { replace: true });
  };

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
        className={`fixed inset-y-0 left-0 bg-gray-800 border-r border-gray-700 z-10 transform
        sm:translate-x-0 sm:static sm:transition-none
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        w-64 flex flex-col`}
      >
        <div className="flex-1 overflow-y-auto mt-16 sm:mt-0 p-6">
          <h1 className="text-2xl font-bold mb-10 text-white hidden sm:block cursor-pointer">
            <span className="text-[#f91942]">Event</span>Sphere Admin
          </h1>

          <nav className="space-y-3">
            <button
              onClick={() => {
                setActiveTab("events");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-4 rounded-xl cursor-pointer ${
                activeTab === "events"
                  ? "bg-[#f91942] text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <FaCalendarAlt />
              Events
            </button>

            <button
              onClick={() => {
                setActiveTab("orders");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-4 rounded-xl cursor-pointer ${
                activeTab === "orders"
                  ? "bg-[#f91942] text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <FaShoppingBag />
              Orders
            </button>
          </nav>
        </div>

        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-red-600 text-white hover:bg-red-700 cursor-pointer"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-20 sm:pt-6 p-6">
        {activeTab === "events" && <EventsList />}
        {activeTab === "orders" && <Orders />}
      </div>
    </div>
  );
};

export default Dashboard;