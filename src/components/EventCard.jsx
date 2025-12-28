import { FiCalendar, FiMapPin, FiEdit, FiTrash2 , FiShoppingCart} from "react-icons/fi";
import { useState } from "react";
import EditEvent from "../pages/admin/EditEvent";
import { useDispatch } from "react-redux";
import { addToCart } from "../lib/cartSlice";

export default function EventCard({ event, onDeleteClick, isAdmin }) {
  const [editEvent, setEditEvent] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 w-full max-w-xs mx-auto">
        {/* IMAGE */}
        <div className="relative h-36 sm:h-40 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover brightness-90 hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 via-transparent to-transparent"></div>
        </div>

        {/* CONTENT */}
        <div className="p-3 sm:p-4 space-y-2">
          {/* TITLE + PRICE */}
          <div className="flex items-start justify-between">
            <h2 className="text-base sm:text-lg font-bold text-white leading-tight flex-1 line-clamp-1">
              {event.title}
            </h2>
            <div className="text-right shrink-0">
              <p className="text-sm sm:text-base font-bold text-indigo-400">
                ${event.price}
              </p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="text-slate-400 text-xs leading-relaxed line-clamp-1">
            {event.description}
          </p>

          {/* SEPARATOR */}
          <div className="border-t border-slate-700 my-2"></div>

          {/* CATEGORY */}
          <div className="flex items-center">
            <span className="text-[10px] text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded-full">
              {event.category}
            </span>
          </div>

          {/* DATE + LOCATION */}
          <div className="flex flex-col gap-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <FiCalendar className="text-indigo-400" size={14} />
              <span className="line-clamp-1">{event.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiMapPin className="text-indigo-400" size={14} />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-2 pt-2">
            {!isAdmin ? (
              <>
                <button 
                  onClick={() => dispatch(addToCart(event))}
                  className="flex-1 py-2 text-sm text-white font-medium bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md shadow-indigo-500/30 flex items-center justify-center gap-2"
                >
                  <FiShoppingCart size={16} />
                  Add To Cart
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditEvent(true)}
                  className="flex-1 p-2 text-indigo-400 bg-slate-800 border border-indigo-500/30 rounded-lg hover:bg-slate-700 transition-colors"
                  aria-label="Edit event"
                >
                  <FiEdit size={16} className="mx-auto" />
                </button>
                <button
                  onClick={() => onDeleteClick(event.id)}
                  className="flex-1 p-2 text-red-400 bg-slate-800 border border-red-500/30 rounded-lg hover:bg-slate-700 transition-colors"
                  aria-label="Delete event"
                >
                  <FiTrash2 size={16} className="mx-auto" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* EDIT POPUP */}
      {editEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-3">
          <EditEvent event={event} onClose={() => setEditEvent(false)} />
        </div>
      )}
    </>
  );
}