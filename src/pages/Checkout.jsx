import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FiShoppingCart, FiCheckCircle } from "react-icons/fi";
import { clearCart } from "../lib/cartSlice";
import { createOrder } from "../api/orderApi";
import toast from "react-hot-toast";

export default function Checkout() {
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) {
    newErrors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
  }
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    setErrors(newErrors);

    try {
      createOrder({
        customerName: form.name,
        email: form.email,
        phone: form.phone,
        total: totalPrice,
        items,
      });

      dispatch(clearCart());
      toast.success("Order placed successfully 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Order failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
          Checkout
        </h1>
        <p className="text-slate-900 mb-6">
          Review your order and complete your purchase
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SIDE - CART ITEMS + TOTAL */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FiShoppingCart className="text-indigo-400" size={24} />
                Your Cart ({totalQuantity} items)
              </h2>

              {items.length === 0 ? (
                <p className="text-slate-400 text-center py-12">
                  Your cart is empty
                </p>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-900 border border-slate-700 rounded-xl p-4 flex gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 text-white">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-slate-400 text-sm">
                          {item.description}
                        </p>
                        <span className="inline-block text-xs text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded-full mt-1">
                          {item.category}
                        </span>
                        <div className="flex justify-between mt-2">
                          <span>Qty: {item.quantity}</span>
                          <span className="text-indigo-400 font-bold">
                            ${item.price}
                          </span>
                        </div>
                        <div className="mt-2 flex justify-between border-t border-slate-700 pt-1">
                          <span className="text-sm text-slate-400">
                            Subtotal:
                          </span>
                          <span className="font-bold">
                            ${item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* TOTAL */}
                  <div className="mt-4 pt-3 border-t border-slate-700 flex justify-between text-xl text-white font-bold">
                    <span>Total:</span>
                    <span className="text-indigo-400">${totalPrice}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE - ORDER FORM */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 border border-slate-700 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FiCheckCircle className="text-indigo-400" size={24} /> Order
                Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-slate-700 text-white border-2 border-slate-600 rounded-lg p-3"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm">{errors.name}</p>
                )}

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-slate-700 text-white border-2 border-slate-600 rounded-lg p-3"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                )}

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full bg-slate-700 text-white border-2 border-slate-600 rounded-lg p-3"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm">{errors.phone}</p>
                )}

                <button
                  onClick={handleSubmit}
                  type="submit"
                  disabled={items.length === 0}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 text-white py-3 rounded-lg font-semibold mt-4"
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
