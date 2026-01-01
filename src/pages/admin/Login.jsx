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
      setEmailError("L'email est requis !");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Le mot de passe est requis !");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    if (onLogin(email, password)) {
      toast.success("Connexion réussie !");
      navigate("/admin");
    } else {
      toast.error("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-linear-to-br bg-gray-100">
      <div className="w-full max-w-md bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-8">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl font-bold mb-1">
            🗂️ EventSphere Admin
          </h1>
          <p className="text-slate-400 text-sm">
            Connectez-vous pour continuer
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="text-white/90 font-semibold text-sm block mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-black/30 border-2 border-white/10 text-white placeholder-white/50 outline-none focus:border-indigo-400"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value.trim()) setEmailError("");
              }}
              onBlur={(e) => {
                if (!e.target.value.trim()) setEmailError("L'email est requis !");
              }}
            />
            {emailError && (
              <span className="text-red-400 text-xs font-medium mt-1 block">
                {emailError}
              </span>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-white/90 font-semibold text-sm block mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-black/30 border-2 border-white/10 text-white placeholder-white/50 outline-none focus:border-indigo-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.trim()) setPasswordError("");
              }}
              onBlur={(e) => {
                if (!e.target.value.trim())
                  setPasswordError("Le mot de passe est requis !");
              }}
            />
            {passwordError && (
              <span className="text-red-400 text-xs font-medium mt-1 block">
                {passwordError}
              </span>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 transition text-white font-semibold py-3 rounded-xl mt-2"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
