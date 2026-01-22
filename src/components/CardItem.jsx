import { useDispatch } from "react-redux";
import { removeCart, decreaseQuantity, increaseQuantity } from "../lib/cartSlice";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";

export default function CardItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-800 border border-slate-700 rounded-xl p-4 mb-3 hover:border-indigo-500/50 transition-all duration-300">
      <div className="flex gap-4">
        {/* IMAGE */}
        <div className="shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-20 h-20 object-cover rounded-lg"
          />
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-w-0 space-y-1">
          {/* TITLE */}
          <h3 className="font-semibold text-white text-lg line-clamp-1">
            {item.title}
          </h3>

          {/* CATEGORY */}
          <div className="flex flex-wrap gap-2 mt-1">
            {item.category && (
              <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded-full">
                {item.category}
              </span>
            )}
          </div>

          {/* PRICE */}
          <p className="text-indigo-400 font-bold text-lg mt-2">${item.price}</p>

          {/* QUANTITY CONTROLS */}
          <div className="flex items-center gap-2 bg-slate-700 rounded-lg p-1 w-fit mt-1">
            <button
              onClick={() => dispatch(decreaseQuantity(item.id))}
              className="w-7 h-7 bg-slate-600 hover:bg-indigo-600 text-white rounded-md flex items-center justify-center transition-colors cursor-pointer"
            >
              <FiMinus size={14} />
            </button>

            <span className="font-semibold text-white px-3 min-w-8 text-center">
              {item.quantity}
            </span>

            <button
              onClick={() => dispatch(increaseQuantity(item.id))}
              className="w-7 h-7 bg-slate-600 hover:bg-indigo-600 text-white rounded-md flex items-center justify-center transition-colors cursor-pointer"
            >
              <FiPlus size={14} />
            </button>
          </div>
        </div>

        {/* REMOVE BUTTON */}
        <button
          onClick={() => dispatch(removeCart(item.id))}
          className="shrink-0 text-red-400 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-all h-fit cursor-pointer"
          aria-label="Remove item"
        >
          <FiTrash2 size={18} />
        </button>
      </div>

      {/* SUBTOTAL */}
      <div className="mt-3 pt-3 border-t border-slate-700 flex items-center justify-between">
        <span className="text-sm text-slate-400">Subtotal:</span>
        <span className="text-white font-bold text-lg">
          ${item.price * item.quantity}
        </span>
      </div>
    </div>
  );
}
