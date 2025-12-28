import { Link, NavLink } from "react-router-dom";
import { FiShoppingCart, FiLogIn } from "react-icons/fi";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 border-b border-slate-700 shadow-lg z-50 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex-1">
          <Link to="/" className="text-2xl font-extrabold">
            <span className="text-indigo-400">Event</span>
            <span className="text-white">Sphere</span>
          </Link>
        </div>

        {/* LINKS */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-8 text-slate-300 font-medium">
          <NavLink 
            to="/" 
            className="hover:text-indigo-400 transition-colors"
          >
            Home
          </NavLink>

          <NavLink 
            to="/events" 
            className="hover:text-indigo-400 transition-colors"
          >
            Events
          </NavLink>

          <NavLink 
            to="/contact" 
            className="hover:text-indigo-400 transition-colors"
          >
            Contact
          </NavLink>
        </div>

        {/* RIGHT SIDE: Cart + Admin */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <NavLink 
            to="/cart" 
            className="text-slate-300 hover:text-indigo-400"
          >
            <FiShoppingCart size={20} />
            <span>Cart</span>
          </NavLink>

          <Link 
            to="/admin"
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-all duration-300"
          >
            <FiLogIn size={18} />
            Admin
          </Link>
        </div>

      </nav>
    </header>
  );
}