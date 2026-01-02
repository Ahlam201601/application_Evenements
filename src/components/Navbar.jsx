import { Link, NavLink } from "react-router-dom";
import { FiShoppingCart, FiLogIn, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { useSelector } from "react-redux";
import CartSidebar from "./CartSidebar";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 border-b border-slate-700 shadow-lg z-50 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <div className="shrink-0">
            <Link to="/" className="text-xl sm:text-2xl font-extrabold">
              <span className="text-[#f91942]">Event</span>
              <span className="text-white">Sphere</span>
            </Link>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8 text-slate-300 font-medium">
            <NavLink to="/" className="hover:text-[#f91942] transition-colors">
              Home
            </NavLink>

            <NavLink
              to="/events"
              className="hover:text-[#f91942] transition-colors"
            >
              Events
            </NavLink>

            <NavLink
              to="/contact"
              className="hover:text-[#f91942] transition-colors"
            >
              Contact
            </NavLink>
          </div>

          {/* DESKTOP RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setCartOpen(true)}
              className="text-slate-300 hover:text-[#f91942] transition-colors relative"
            >
              <FiShoppingCart size={22} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#f91942] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </button>

            <Link
              to="/admin"
              className="flex items-center gap-2 bg-[#f91942] text-white px-4 py-2 rounded-lg font-semibold shadow-lg shadow-[#f91942]/30 hover:bg-[#df1539] transition-all duration-300"
            >
              <FiLogIn size={18} />
              Admin
            </Link>
          </div>

          {/* MOBILE BUTTONS */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="text-slate-300 hover:text-[#f91942] transition-colors relative"
            >
              <FiShoppingCart size={22} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#f91942] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-[#f91942] transition-colors p-2"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-700 pt-4">
            <div className="flex flex-col gap-4">
              <NavLink
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-slate-300 hover:text-[#f91942] transition-colors font-medium"
              >
                Home
              </NavLink>

              <NavLink
                to="/events"
                onClick={() => setIsMenuOpen(false)}
                className="text-slate-300 hover:text-[#f91942] transition-colors font-medium"
              >
                Events
              </NavLink>

              <NavLink
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-slate-300 hover:text-[#f91942] transition-colors font-medium"
              >
                Contact
              </NavLink>

              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 bg-[#f91942] text-white px-4 py-2 rounded-lg font-semibold shadow-lg shadow-[#f91942]/30 hover:bg-[#df1539] transition-all duration-300 w-fit"
              >
                <FiLogIn size={18} />
                Admin
              </Link>
            </div>
          </div>
        )}

        <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
      </nav>
    </header>
  );
}
