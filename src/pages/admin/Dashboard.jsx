import { useState } from "react";
import EventsList from "./EventsList";
import Orders from "./Orders";
import { FaCalendarAlt, FaShoppingBag } from "react-icons/fa";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("events");

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white fixed inset-y-0 left-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-10">
            EventSphere Admin
          </h1>

          <nav className="space-y-3">
            <button
              onClick={() => setActiveTab("events")}
              className={`w-full flex items-center gap-3 text-left p-4 rounded transition ${
                activeTab === "events"
                  ? "bg-indigo-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <FaCalendarAlt className="text-lg" />
              <span>Events</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-3 text-left p-4 rounded transition ${
                activeTab === "orders"
                  ? "bg-indigo-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <FaShoppingBag className="text-lg" />
              <span>Orders</span>
            </button>
          </nav>
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
