import { FiCalendar, FiMapPin, FiEdit, FiTrash2, FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import EditEvent from "../pages/admin/EditEvent";
import { useDispatch } from "react-redux";
import { addToCart } from "../lib/cartSlice";

export default function EventCard({ event, onDeleteClick, isAdmin }) {
  const [editEvent, setEditEvent] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(event);
  const dispatch = useDispatch();

  const handleUpdate = (updatedEvent) => {
    setCurrentEvent(updatedEvent);
  };

  return (
    <>
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 w-full max-w-xs mx-auto border border-gray-700">
        {/* IMAGE */}
        <div className="relative h-36 sm:h-40 overflow-hidden">
          <img
            src={currentEvent.image}
            alt={currentEvent.title}
            className="w-full h-full object-cover brightness-90 hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-transparent to-transparent"></div>
          {/* CATEGORY BADGE */}
          <div className="absolute top-3 right-3 bg-[#f91942] text-white font-bold px-3 py-1 rounded-full text-sm shadow-lg shadow-[#f91942]/30">
            {currentEvent.category}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-3 sm:p-4 space-y-3">
          {/* TITLE AND PRICE */}
          <div className="flex items-start justify-between">
            <h2 className="text-base sm:text-lg font-bold text-white leading-tight flex-1 line-clamp-1">
              {currentEvent.title}
            </h2>
            <div className="text-right shrink-0 ml-2">
              <div className="text-sm text-gray-400">From</div>
              <div className="text-xl font-bold text-[#f91942]">${currentEvent.price}</div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
            {currentEvent.description}
          </p>

          {/* DATE + LOCATION */}
          <div className="flex flex-col gap-2 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <FiCalendar className="text-[#f91942]" size={14} />
              <span className="line-clamp-1">{currentEvent.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiMapPin className="text-[#f91942]" size={14} />
              <span className="line-clamp-1">{currentEvent.location}</span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-2 pt-2">
            {!isAdmin ? (
              <>
                <button 
                  onClick={() => dispatch(addToCart(currentEvent))}
                  className="flex-1 py-2.5 text-sm text-white font-medium bg-[#f91942] hover:bg-[#e0183b] rounded-lg transition-all duration-300 shadow-lg shadow-[#f91942]/20 flex items-center justify-center gap-2"
                >
                  <FiShoppingCart size={16} />
                  Add To Cart
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditEvent(true)}
                  className="flex-1 p-2.5 text-white bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-[#f91942] hover:border-[#f91942] transition-colors group"
                  aria-label="Edit event"
                >
                  <FiEdit size={16} className="mx-auto group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={() => onDeleteClick(currentEvent.id)}
                  className="flex-1 p-2.5 text-white bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-red-600 hover:border-red-600 transition-colors group"
                  aria-label="Delete event"
                >
                  <FiTrash2 size={16} className="mx-auto group-hover:scale-110 transition-transform" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* EDIT POPUP */}
      {editEvent && (
        <EditEvent 
          event={currentEvent} 
          onClose={() => setEditEvent(false)} 
          onUpdate={handleUpdate} 
        />
      )}
    </>
  );
}