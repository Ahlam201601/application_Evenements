import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../../api/eventsApi";
import EventCard from "../../components/EventCard";

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="pl-11 w-full transition ">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Event Management</h1>

          <button
            onClick={() => navigate("/admin/add")}
            className="bg-indigo-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            + Add Event
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}
