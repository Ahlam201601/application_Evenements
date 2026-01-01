import { useState } from "react";
import { FiUser, FiMail, FiMessageSquare, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate name
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Validate email
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Validate message
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    // If no errors, submit
    toast.success("✅ Message sent successfully!");
    
      // Reset form
      setForm({ name: "", email: "", message: "" });
    
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Contact Us
          </h1>
          <p className="text-slate-400">
            Get in touch with us. We'd love to hear from you!
          </p>
        </div>

        {/* CONTACT FORM */}
        <div className="bg-gray-800 border border-slate-700 rounded-3xl p-10 sm:p-14 shadow-2xl shadow-indigo-900/20 max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* NAME */}
            <div>
              
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Full Name "
                  className={`w-full bg-slate-700 text-white placeholder-slate-400 border-2 rounded-lg pl-10 pr-4 py-3 focus:outline-none transition-colors ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-600 focus:border-indigo-500"
                  }`}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`w-full bg-slate-700 text-white placeholder-slate-400 border-2 rounded-lg pl-10 pr-4 py-3 focus:outline-none transition-colors ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-600 focus:border-indigo-500"
                  }`}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* MESSAGE */}
            <div>
              <div className="relative">
                <FiMessageSquare className="absolute left-3 top-3 text-slate-400" size={18} />
                <textarea
                  placeholder="Message ..."
                  rows="5"
                  className={`w-full bg-slate-700 text-white placeholder-slate-400 border-2 rounded-lg pl-10 pr-4 py-3 focus:outline-none transition-colors resize-none ${
                    errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-600 focus:border-indigo-500"
                  }`}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              {errors.message && (
                <p className="text-red-400 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-lg shadow-indigo-600/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FiSend size={18} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}