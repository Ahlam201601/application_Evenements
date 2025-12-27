import { FiCalendar, FiMapPin, FiEdit, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import EditEvent from "../pages/admin/EditEvent";

export default function EventCard({ event, onDeleteClick, isAdmin }) {
  const [editEvent, setEditEvent] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl border border-indigo-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full max-w-sm mx-auto">

        {/* IMAGE */}
        <div className="relative h-44 sm:h-48 md:h-52 lg:h-56">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">

          {/* CATEGORY */}
          <span className="inline-block bg-yellow-100 text-yellow-700 font-semibold px-3 py-1 rounded-full text-xs sm:text-sm mb-1">
            {event.category}
          </span>

          {/* TITLE */}
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-1">
            {event.title}
          </h2>

          {/* PRICE */}
          <p className="text-indigo-600 font-bold text-sm sm:text-base">
            ${event.price}
          </p>

          {/* DATE + LOCATION */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 mt-1">
            <div className="flex items-center gap-1">
              <FiCalendar />
              {event.date}
            </div>

            <div className="flex items-center gap-1">
              <FiMapPin />
              {event.location}
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
            {event.description}
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-2 pt-3 sm:pt-4">
            {!isAdmin ? (
              <button
                className="p-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
              >
                View
              </button>
            ) : (
              <>
                <button
                  onClick={() => setEditEvent(true)}
                  className="p-2 text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
                  aria-label="Edit event"
                >
                  <FiEdit size={18} />
                </button>

                <button
                  onClick={() => onDeleteClick(event.id)}
                  className="p-2 text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                  aria-label="Delete event"
                >
                  <FiTrash2 size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* EDIT POPUP */}
      {editEvent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-3">
          <EditEvent 
            event={event} 
            onClose={() => setEditEvent(false)} 
          />
        </div>
      )}
    </>
  );
}
