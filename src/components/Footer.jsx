import React from "react";
import {
  ArrowUpRight,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-slate-300 pt-16 pb-8 px-8 sm:px-12 border-t border-slate-700 shadow-inner">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="mb-2">
              <h3 className="text-2xl font-bold bg-linear-to-r from-[#f91942] to-[#ff4d6d] bg-clip-text text-transparent">
                CONTACT US
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Get in touch with our team
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-300 hover:bg-[#f91942] hover:text-white hover:border-[#f91942] hover:scale-105 transition-all duration-300 group"
              >
                <Youtube
                  size={22}
                  className="group-hover:scale-110 transition-transform"
                />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-300 hover:bg-[#f91942] hover:text-white hover:border-[#f91942] hover:scale-105 transition-all duration-300 group"
              >
                <Twitter
                  size={22}
                  className="group-hover:scale-110 transition-transform"
                />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-300 hover:bg-[#f91942] hover:text-white hover:border-[#f91942] hover:scale-105 transition-all duration-300 group"
              >
                <Instagram
                  size={22}
                  className="group-hover:scale-110 transition-transform"
                />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-300 hover:bg-[#f91942] hover:text-white hover:border-[#f91942] hover:scale-105 transition-all duration-300 group"
              >
                <Facebook
                  size={22}
                  className="group-hover:scale-110 transition-transform"
                />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h3 className="font-bold text-white text-xl mb-4">Explore</h3>

            <a
              href="/"
              className="text-slate-300 hover:text-[#f91942] transition-colors"
            >
              Home
            </a>
            <a
              href="/events"
              className="text-slate-300 hover:text-[#f91942] transition-colors"
            >
              Events
            </a>
            <a
              href="/admin"
              className="text-slate-300 hover:text-[#f91942] transition-colors"
            >
              Admin
            </a>
            <a
              href="/contact"
              className="text-slate-300 hover:text-[#f91942] transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h3 className="font-bold text-white text-xl mb-3">
              Newsletter
            </h3>
            <p className="text-slate-400 text-sm">
              Sign up to receive the earliest promotional notifications!
            </p>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-900 border border-slate-700 rounded px-4 py-2 w-full focus:outline-none focus:border-[#f91942] text-sm text-slate-200 placeholder:text-slate-500 transition-colors"
              />

              <button className="bg-[#f91942] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#df1539] transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© 2026 EventSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
