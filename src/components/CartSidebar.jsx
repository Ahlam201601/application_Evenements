import { useSelector } from "react-redux";
import CardItem from "./CardItem";

export default function CartSidebar({ open, onClose  }) {
  const { items, totalQuantity } = useSelector(
    (state) => state.cart
  );

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 w-md h-screen bg-white p-6 flex flex-col transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        } text-white`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#0a0a1f]">My Cart</h2>
          <button
            onClick={onClose}
            className="text-xl font-bold text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto">
          {items.length > 0 ? (
            items.map((item) => (
              <CardItem key={item.id} item={item} />
            ))
          ) : (
            <p className="text-gray-500 text-center mt-10">
              Your cart is empty 🛒
            </p>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="mt-4 border-t pt-4 mb-4 text-black">
            <p className="font-semibold">
              Total Items: {totalQuantity}
            </p>
            
          </div>
        )}

        {/* Checkout */}
        <button className="mt-auto w-full bg-black hover:bg-gray-500 text-white py-2 rounded font-semibold">
          Checkout
        </button>
      </div>
    </div>
  );
}