import { useSelector } from "react-redux";
import { FiX, FiShoppingCart } from "react-icons/fi";
import CardItem from "./CardItem";

export default function CartSidebar({ open, onClose }) {
  const { items, totalQuantity } = useSelector((state) => state.cart);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* OVERLAY */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed right-0 top-0 w-full sm:w-96 h-screen bg-gray-800 shadow-2xl flex flex-col transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="bg-indigo-600 p-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FiShoppingCart size={24} />
            My Cart
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-indigo-700 rounded-lg p-2 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* ITEMS LIST */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-900">
          {items.length > 0 ? (
            items.map((item) => <CardItem key={item.id} item={item} />)
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FiShoppingCart className="text-slate-600 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-white mb-2">
                Your cart is empty
              </h3>
              <p className="text-slate-400 mb-6">
                Start adding some events!
              </p>
              <button
                onClick={onClose}
                className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Browse Events
              </button>
            </div>
          )}
        </div>

        {/* FOOTER - SUMMARY */}
        {items.length > 0 && (
          <div className="bg-gray-800 border-t border-slate-700 p-5 space-y-3">
            {/* TOTAL PRICE */}
            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold text-white">Total Items::</span>
              <span className="font-bold text-indigo-400 text-2xl">
                {totalQuantity}
              </span>
            </div>

            {/* CHECKOUT BUTTON */}
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-lg shadow-indigo-600/30 transition-all duration-300">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}