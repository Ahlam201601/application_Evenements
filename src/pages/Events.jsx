import { useState, useEffect } from "react";
import { getEvents } from "../api/eventsApi";
import EventCard from "../components/EventCard";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">

      {/* GRID ONLY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isAdmin={false}  
          />
        ))}
      </div>

    </div>
  );
}
