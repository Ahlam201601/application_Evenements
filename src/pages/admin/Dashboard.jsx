import { useState } from "react";
import EventsList from "./EventsList";
import Orders from "./Orders";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("events");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar fixe */}
      <div className="w-76 bg-gray-800 text-white fixed h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-10">EventSphere Admin</h1>

          <nav>
            <button
              onClick={() => setActiveTab("events")}
              className={`w-full text-left p-4 rounded mb-3 transition ${
                activeTab === "events"
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              📅 Events
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full text-left p-4 rounded transition ${
                activeTab === "orders"
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              📦 Orders
            </button>
          </nav>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="ml-64 flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === "events" && <EventsList />}
          {activeTab === "orders" && <Orders />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
