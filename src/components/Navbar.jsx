import { Link, NavLink } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex-1">
          <Link to="/" className="text-2xl font-extrabold">
            <span className="text-purple-500">Event</span>
            <span className="text-indigo-500">Sphere</span>
          </Link>
        </div>

        {/* LINKS */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-8 text-gray-700 font-medium">
          <NavLink 
            to="/" 
            className="hover:text-indigo-600 transition-colors"
          >
            Home
          </NavLink>

          <NavLink 
            to="/events" 
            className="hover:text-indigo-600 transition-colors"
          >
            Events
          </NavLink>

          <NavLink 
            to="/contact" 
            className="hover:text-indigo-600 transition-colors"
          >
            Contact
          </NavLink>
        </div>

        {/* RIGHT SIDE: Cart + Admin */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <NavLink to="/cart" className="flex items-center gap-1 text-gray-700 font-medium hover:text-indigo-600 transition-colors">
            <FiShoppingCart size={20} />
            <span>Cart</span>
          </NavLink>

          <Link 
            to="/admin"
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-purple-700 transition"
          >
            <FiUser size={18} />
            Admin
          </Link>
        </div>

      </nav>
    </header>
  );
}
