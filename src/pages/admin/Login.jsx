import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    if (!email.trim()) {
      setEmailError("Email is required!");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required!");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    if (onLogin(email, password)) {
      toast.success("Login successful!");
      navigate("/admin");
    } else {
      toast.error("Incorrect email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-900">
      <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-sm border border-[#f91942]/30 rounded-2xl shadow-lg p-8">
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl font-bold mb-1">
            🗂️ EventSphere Admin
          </h1>
          <p className="text-gray-400 text-sm">Login to continue</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="text-white font-semibold text-sm block mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@gmail.com"
              className={`w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 bg-gray-800 border-2 outline-none focus:ring-2 focus:ring-[#f91942]/50 focus:border-[#f91942] ${
                emailError ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-700"
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value.trim()) setEmailError("");
              }}
              onBlur={(e) => {
                if (!e.target.value.trim()) setEmailError("Email is required!");
              }}
            />
            {emailError && (
              <span className="text-red-400 text-xs font-medium mt-1 block">{emailError}</span>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-white font-semibold text-sm block mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 bg-gray-800 border-2 outline-none focus:ring-2 focus:ring-[#f91942]/50 focus:border-[#f91942] ${
                passwordError ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-700"
              }`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.trim()) setPasswordError("");
              }}
              onBlur={(e) => {
                if (!e.target.value.trim()) setPasswordError("Password is required!");
              }}
            />
            {passwordError && (
              <span className="text-red-400 text-xs font-medium mt-1 block">{passwordError}</span>
            )}
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-[#f91942] to-[#ff4d6d] text-white font-semibold py-3 rounded-xl mt-2 shadow-lg hover:shadow-xl hover:shadow-[#f91942]/40 transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
