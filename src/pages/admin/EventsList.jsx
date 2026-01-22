import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents, deleteEvent } from "../../services/eventsApi";
import EventCard from "../../components/EventCard";
import toast from "react-hot-toast";

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteEvent(id)
      .then(() => {
        setEvents((prev) => prev.filter((e) => e.id !== id));
        toast.success("Event deleted successfully 🎉");
      })
      .catch((err) => console.log("Delete error:", err));
  };

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 px-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-white ml-8">
          Event Management
        </h1>

        <button
          onClick={() => navigate("/admin/add")}
          className="bg-linear-to-r from-[#f91942] to-[#ff4d6d] text-white px-5 py-2.5 sm:py-3 rounded-2xl font-semibold shadow-lg hover:shadow-[#f91942]/50 transition w-full sm:w-auto text-center mr-8 cursor-pointer"
        >
          + Add Event
        </button>
      </div>

      {/* EVENTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-2">
        {events.length === 0 ? (
          <p className="text-gray-400 col-span-full min-h-screen flex items-center justify-center">
            Loading...
          </p>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onDeleteClick={(id) => {
                setDeleteEventId(id);
                setShowDelete(true);
              }}
              isAdmin={true}
            />
          ))
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-3">
          <div className="bg-white w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-[#f91942] text-center flex flex-col items-center space-y-4">
            
            {/* Icon */}
            <div className="bg-[#f91942]/10 text-[#f91942] w-16 h-16 flex items-center justify-center rounded-full text-3xl">
              ⚠️
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Confirm Delete?
            </h3>

            {/* Text */}
            <p className="text-gray-700 text-sm sm:text-base">
              Are you sure you want to delete this event? This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 w-full mt-2">
              <button
                onClick={() => setShowDelete(false)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleDelete(deleteEventId);
                  setShowDelete(false);
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#f91942] text-white font-semibold shadow-lg hover:shadow-[#f91942]/50 transition"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
