import { useSelector } from "react-redux";
import { useState } from "react";
import { FiShoppingCart, FiUser, FiMail, FiPhone, FiCheckCircle } from "react-icons/fi";

export default function Checkout() {
  const { items, totalQuantity , totalPrice} = useSelector((state) => state.cart);
  

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      alert("Please fill in all fields!");
      return;
    }
    alert("Order placed successfully 🎉");
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
            Checkout
          </h1>
          <p className="text-slate-900">
            Review your order and complete your purchase
          </p>
        </div>

        {/* GRID LAYOUT - CART + FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT SIDE - CART ITEMS (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* CART ITEMS SECTION */}
            <div className="bg-gray-800 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FiShoppingCart className="text-indigo-400" size={24} />
                Your Cart ({totalQuantity} items)
              </h2>

              {items.length === 0 ? (
                <div className="text-center py-12">
                  <FiShoppingCart className="mx-auto text-slate-600 mb-4" size={64} />
                  <p className="text-slate-400">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-900 border border-slate-700 rounded-xl p-4 hover:border-indigo-500/50 transition-all"
                    >
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
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white mb-1 line-clamp-1">
                            {item.title}
                          </h3>
                          <span className="inline-block text-xs text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded-full mb-2">
                            {item.category}
                          </span>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-slate-400">
                              Qty: <span className="text-white font-semibold">{item.quantity}</span>
                            </span>
                            <p className="text-indigo-400 font-bold text-lg">
                              ${item.price}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* SUBTOTAL */}
                      <div className="mt-3 pt-3 border-t border-slate-700 flex items-center justify-between">
                        <span className="text-sm text-slate-400">Subtotal:</span>
                        <span className="text-white font-bold">
                          ${(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* TOTAL SECTION */}
            {items.length > 0 && (
              <div className="bg-gray-800 border border-slate-700 rounded-2xl p-6">
                <div className="space-y-3">
                  <div className="border-t border-slate-700 pt-3 flex items-center justify-between text-xl">
                    <span className="font-bold text-white">Total:</span>
                    <span className="font-bold text-indigo-400 text-2xl">
                      ${totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE - ORDER FORM (1 column) */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 border border-slate-700 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FiCheckCircle className="text-indigo-400" size={24} />
                Order Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* NAME */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-slate-700 text-white placeholder-slate-400 border-2 border-slate-600 rounded-lg pl-10 pr-4 py-3 focus:border-indigo-500 focus:outline-none transition-colors"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-slate-700 text-white placeholder-slate-400 border-2 border-slate-600 rounded-lg pl-10 pr-4 py-3 focus:border-indigo-500 focus:outline-none transition-colors"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* PHONE */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="tel"
                      placeholder="+212 6XX XXX XXX"
                      className="w-full bg-slate-700 text-white placeholder-slate-400 border-2 border-slate-600 rounded-lg pl-10 pr-4 py-3 focus:border-indigo-500 focus:outline-none transition-colors"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={items.length === 0}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold shadow-lg shadow-indigo-600/30 transition-all duration-300 mt-6"
                >
                  Place Order
                </button>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}