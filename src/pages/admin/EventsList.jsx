import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents , deleteEvent } from "../../api/eventsApi";
import EventCard from "../../components/EventCard";
import toast from "react-hot-toast";

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [showDelete , setShowDelete] = useState(false);
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
        setEvents(prev => prev.filter(e => e.id !== id));
        toast.success("Event deleted successfully 🎉");
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {events.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            onDeleteClick={(id) => { 
              setDeleteEventId(id); 
              setShowDelete(true); 
            }}  
            isAdmin={true}
          />
        ))}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-3">
          <div className="bg-white w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-red-100 text-center flex flex-col items-center space-y-4">
            
            {/* Icon */}
            <div className="bg-red-100 text-red-600 w-16 h-16 flex items-center justify-center rounded-full text-3xl">
              ⚠️
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
              Confirm Delete?
            </h3>

            <p className="text-gray-500 text-sm sm:text-base">
              Are you sure you want to delete this event? This action cannot be undone.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 w-full mt-2">
              <button
                onClick={() => setShowDelete(false)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleDelete(deleteEventId);
                  setShowDelete(false);
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
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
