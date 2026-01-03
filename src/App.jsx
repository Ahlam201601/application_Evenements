import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/Login";
import AddEvent from "./pages/admin/AddEvent";
import Events from "./pages/Events";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import { Toaster } from "react-hot-toast";
import useAuth from "./auth/useAuth";
import "./App.css";

function App() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/admin" replace />
            ) : (
              <Login onLogin={login} />
            )
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <Dashboard onLogout={logout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/admin/add"
          element={
            isAuthenticated ? (
              <AddEvent />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;