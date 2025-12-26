import { FiCalendar, FiMapPin, FiEdit, FiTrash2 } from "react-icons/fi";

export default function EventCard({ event , onDeleteClick}) {
  return (
    <div className="bg-white rounded-2xl border border-indigo-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 
    w-full max-w-sm mx-auto">

      {/* IMAGE */}
      <div className="relative h-44 sm:h-48 md:h-52 lg:h-56">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />

        {/* PRICE */}
        <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow">
          ${event.price}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">

        {/* TITLE + CATEGORY */}
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-1">
            {event.title}
          </h2>

          <span className="bg-yellow-100 text-yellow-700 font-semibold px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs">
            {event.category}
          </span>
        </div>

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
          <button
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
        </div>
      </div>
    </div>
  );
}
