import { FiCalendar, FiMapPin, FiEdit, FiTrash2 } from "react-icons/fi";

export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-2xl border border-indigo-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-85">
      {/* IMAGE */}
      <div className="relative h-45">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />

        {/* PRICE */}
        <span className="absolute top-3 right-3 bg-indigo-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow">
          ${event.price}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">
        {/* TITLE + CATEGORY */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
            {event.title}
          </h2>

          <span className="bg-yellow-100 text-yellow-700 font-semibold px-3 py-1 rounded-full text-xs">
            {event.category}
          </span>
        </div>

        {/* DATE + LOCATION */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
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
        <p className="text-gray-500 text-sm leading-relaxed">
          {event.description}
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-2 pt-4">
          <button
            className="p-2.5 text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
            aria-label="Edit event"
          >
            <FiEdit size={18} />
          </button>

          <button
            className="p-2.5 text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
            aria-label="Delete event"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
