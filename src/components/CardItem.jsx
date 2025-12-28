import { useDispatch } from "react-redux";
import {
  removeCart,
  decreaseQuantity,
  increaseQuantity
} from "../lib/cartSlice";
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
            alt={item.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-w-0">
          {/* TITLE */}
          <h3 className="font-semibold text-white mb-1 line-clamp-1">
            {item.name}
          </h3>

          {/* PRICE */}
          <p className="text-indigo-400 font-bold text-lg mb-2">
            ${item.price}
          </p>

          {/* QUANTITY CONTROLS */}
          <div className="flex items-center gap-2 bg-slate-700 rounded-lg p-1 w-fit">
            <button
              onClick={() => dispatch(decreaseQuantity(item.id))}
              className="w-7 h-7 bg-slate-600 hover:bg-indigo-600 text-white rounded-md flex items-center justify-center transition-colors"
            >
              <FiMinus size={14} />
            </button>

            <span className="font-semibold text-white px-3 min-w-8 text-center">
              {item.quantity}
            </span>

            <button
              onClick={() => dispatch(increaseQuantity(item.id))}
              className="w-7 h-7 bg-slate-600 hover:bg-indigo-600 text-white rounded-md flex items-center justify-center transition-colors"
            >
              <FiPlus size={14} />
            </button>
          </div>
        </div>

        {/* REMOVE BUTTON */}
        <button
          onClick={() => dispatch(removeCart(item.id))}
          className="shrink-0 text-red-400 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-all h-fit"
          aria-label="Remove item"
        >
          <FiTrash2 size={18} />
        </button>
      </div>

      {/* TOTAL */}
      <div className="mt-3 pt-3 border-t border-slate-700 flex items-center justify-between">
        <span className="text-sm text-slate-400">Subtotal:</span>
        <span className="text-white font-bold text-lg">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
}