import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents , deleteEvent } from "../../api/eventsApi";
import EventCard from "../../components/EventCard";

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteEvent(id)
      .then(() => {
        setEvents(prev => prev.filter(e => e.id !== id));
      })
      .catch(err => console.log("Delete error :", err));
  };

  return (
    <div className="w-full transition px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Event Management
        </h1>

        <button
          onClick={() => navigate("/admin/add")}
          className="bg-indigo-600 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          + Add Event
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
