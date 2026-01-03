import { useState } from "react";
import { FiUser, FiMail, FiMessageSquare, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";



export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const VITE_N8N_CONTACT_URL = import.meta.env.VITE_N8N_CONTACT_URL;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email format";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };



  const submit = async (e) => {
  e.preventDefault();
  
  if (!validate()) return;

  setLoading(true);

  try {
    await axios.post(VITE_N8N_CONTACT_URL, form);
    toast.success("Message sent successfully ✅");
    setForm({ name: "", email: "", message: "" });
  } catch (error) {
    console.error("Error sending message:", error);
    toast.error("Failed to send message ❌");
  } finally {
    setLoading(false);
  }
};

  

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white">
            Contact <span className="text-[#f91942]">Us</span>
          </h1>
          <p className="text-gray-400 mt-3">We'd love to hear from you</p>
        </div>

        <form
          onSubmit={submit}
          className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-3xl p-10 shadow-2xl space-y-8"
        >
          {[
            { icon: FiUser, key: "name", placeholder: "Full Name" },
            { icon: FiMail, key: "email", placeholder: "Email Address" },
          ].map((f, i) => (
            <div key={i}>
              <div className="relative">
                <f.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={form[f.key]}
                  placeholder={f.placeholder}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className={`w-full bg-gray-900/50 text-white border-2 rounded-xl pl-12 pr-4 py-4 focus:outline-none transition-all ${
                    errors[f.key]
                      ? "border-red-500"
                      : "border-gray-700 focus:border-[#f91942]"
                  }`}
                />
              </div>
              {errors[f.key] && (
                <p className="text-red-400 text-sm mt-2">{errors[f.key]}</p>
              )}
            </div>
          ))}

          <div>
            <div className="relative">
              <FiMessageSquare className="absolute left-4 top-4 text-gray-400" />
              <textarea
                rows="6"
                value={form.message}
                placeholder="Type your message..."
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className={`w-full bg-gray-900/50 text-white border-2 rounded-xl pl-12 pr-4 py-4 resize-none ${
                  errors.message
                    ? "border-red-500"
                    : "border-gray-700 focus:border-[#f91942]"
                }`}
              />
            </div>
            {errors.message && (
              <p className="text-red-400 text-sm mt-2">{errors.message}</p>
            )}
          </div>

          <button
            disabled={loading}
            className="w-full bg-linear-to-r from-[#f91942] to-[#ff4d6d] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg disabled:opacity-70"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FiSend />
            )}
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}
