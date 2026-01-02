import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FiShoppingCart, FiCheckCircle, FiUser, FiMail, FiPhone } from "react-icons/fi";
import { clearCart } from "../lib/cartSlice";
import { createOrder, placeOrder } from "../api/orderApi";
import toast from "react-hot-toast";

export default function Checkout() {
  const { items, totalPrice } = useSelector(
    (state) => state.cart
  );
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    
    const orderData = {
      customerName: form.name,
      email: form.email,
      phone: form.phone,
      total: totalPrice,
      items,
      createdAt: new Date().toISOString(),
    };

    try {
      // ✅ send to MockAPI + n8n at same time
      Promise.all([
        createOrder(orderData), // MockAPI
        placeOrder(orderData), // n8n
      ]);

      dispatch(clearCart());
      toast.success("Order placed successfully 🎉");
      setForm({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Order failed ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
            Check<span className="text-[#f91942]">out</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Review your order and complete your purchase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT SIDE - ORDER FORM */}
          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#f91942]/10 rounded-xl">
                  <FiUser className="text-[#f91942]" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Customer Information</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* NAME */}
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      className={`w-full bg-gray-900/50 text-white placeholder-gray-500 border-2 rounded-xl pl-12 pr-4 py-3 focus:outline-none transition-all ${
                        errors.name
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-700 focus:border-[#f91942] focus:ring-2 focus:ring-[#f91942]/20"
                      }`}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-1">{errors.name}</p>
                  )}
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      className={`w-full bg-gray-900/50 text-white placeholder-gray-500 border-2 rounded-xl pl-12 pr-4 py-3 focus:outline-none transition-all ${
                        errors.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-700 focus:border-[#f91942] focus:ring-2 focus:ring-[#f91942]/20"
                      }`}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-1">{errors.email}</p>
                  )}
                </div>

                {/* PHONE */}
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Phone Number</label>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      className={`w-full bg-gray-900/50 text-white placeholder-gray-500 border-2 rounded-xl pl-12 pr-4 py-3 focus:outline-none transition-all ${
                        errors.phone
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-700 focus:border-[#f91942] focus:ring-2 focus:ring-[#f91942]/20"
                      }`}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-1">{errors.phone}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={items.length === 0 || isSubmitting}
                  className="w-full bg-linear-to-r from-[#f91942] to-[#ff4d6d] text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-[#f91942]/30 hover:shadow-xl hover:shadow-[#f91942]/40 hover:from-[#e0183b] hover:to-[#e93d5e] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiCheckCircle size={20} />
                      Place Order
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE - CART ITEMS */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#f91942]/10 rounded-xl">
                  <FiShoppingCart className="text-[#f91942]" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Order Summary</h2>
                </div>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-8">
                  <FiShoppingCart className="text-gray-600 mx-auto mb-4" size={48} />
                  <p className="text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 flex gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 text-white">
                        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
                            {item.category}
                          </span>
                          <span className="text-sm text-gray-400">Qty: {item.quantity}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Price:</span>
                          <span className="text-lg font-bold text-[#f91942]">
                            ${totalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TOTAL */}
              {items.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center text-white">
                    <div>
                      <div className="text-lg font-bold">Total</div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-[#f91942]">${totalPrice}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}