import { useSelector } from "react-redux";
import { FiX, FiShoppingCart } from "react-icons/fi";
import CardItem from "./CardItem";
import { useNavigate } from "react-router-dom";

export default function CartSidebar({ open, onClose }) {
  const { 
    items = [], 
    totalQuantity = 0, 
    totalPrice = 0 
  } = useSelector((state) => state.cart) || {};
  
  const navigate = useNavigate();

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
        className={`fixed right-0 top-0 w-full sm:w-96 h-screen bg-gray-900 shadow-2xl flex flex-col transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="bg-linear-to-r from-[#f91942] to-[#ff4d6d] p-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FiShoppingCart size={24} />
            My Cart
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-[#e0183b] rounded-lg p-2 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* ITEMS LIST */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
          {items.length > 0 ? (
            items.map((item) => <CardItem key={item.id} item={item} />)
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FiShoppingCart className="text-gray-600 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-white mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-400 mb-6">Start adding some events!</p>
              <button
                 onClick={() => {
                onClose();
                navigate("/events");
              }}
                className="bg-[#f91942] hover:bg-[#e0183b] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Browse Events
              </button>
            </div>
          )}
        </div>

        {/* FOOTER - SUMMARY */}
        {items.length > 0 && (
          <div className="bg-gray-800 border-t border-gray-700 p-5 space-y-3">
            {/* TOTAL */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-medium">Total Items:</span>
                <span className="text-white font-bold text-lg">
                  {totalQuantity}
                </span>
              </div>

              <div className="border-t border-gray-700 pt-3 flex items-center justify-between">
                <span className="text-white font-bold text-lg">Total:</span>
                <span className="text-[#f91942] font-bold text-2xl">
                  ${totalPrice}
                </span>
              </div>
            </div>

            {/* CHECKOUT BUTTON */}
            <button
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
              className="w-full bg-linear-to-r from-[#f91942] to-[#ff4d6d] hover:from-[#e0183b] hover:to-[#e93d5e] text-white py-3 rounded-lg font-semibold shadow-lg shadow-[#f91942]/30 transition-all duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}