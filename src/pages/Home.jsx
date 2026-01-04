import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../api/eventsApi";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-center bg-cover"
          style={{ backgroundImage: `url(/Home.png)` }}
        />

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-8 text-center space-y-6">
          <h1 className="text-5xl sm:text-7xl font-serif font-bold mb-6">
            Welcome to Event Sphere
          </h1>
          <p className="text-xl sm:text-2xl max-w-2xl">
            Discover amazing events and experiences around you
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              to="/events"
              className="bg-linear-to-r from-[#f91942] to-[#ff4d6d] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#f91942]/40 hover:from-[#e0183b] hover:to-[#e93d5e]"
            >
              Explore Events
            </Link>
            <Link
              to="/contact"
              className="bg-linear-to-r from-[#f91942] to-[#ff4d6d] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#f91942]/40 hover:from-[#e0183b] hover:to-[#e93d5e]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Categories Section */}
      <section className="relative bg-linear-to-r from-gray-900 to-gray-800 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Browse by <span className="text-[#f91942]">Category</span>
            </h2>
            <p className="text-gray-400">
              Click on a category to explore events
            </p>
          </div>

          {/* 4 Category Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Music */}
            <Link
              to="/events?category=music"
              className="group bg-gray-800/50 hover:bg-linear-to-br from-[#f91942]/20 to-purple-600/20 border border-gray-700 hover:border-[#f91942] rounded-xl p-6 text-center transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-[#f91942]/20"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-linear-to-r from-[#f91942] to-purple-600 rounded-lg flex items-center justify-center group-hover:animate-pulse">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Music</h3>
              <p className="text-sm text-gray-400">Concerts & Festivals</p>
            </Link>

            {/* Art */}
            <Link
              to="/events?category=art"
              className="group bg-gray-800/50 hover:bg-linear-to-br from-blue-500/20 to-cyan-400/20 border border-gray-700 hover:border-blue-500 rounded-xl p-6 text-center transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-linear-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center group-hover:animate-pulse">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Art</h3>
              <p className="text-sm text-gray-400">Exhibitions & Galleries</p>
            </Link>

            {/* Sport */}
            <Link
              to="/events?category=sport"
              className="group bg-gray-800/50 hover:bg-linear-to-br from-green-500/20 to-emerald-400/20 border border-gray-700 hover:border-green-500 rounded-xl p-6 text-center transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-linear-to-r from-green-500 to-emerald-400 rounded-lg flex items-center justify-center group-hover:animate-pulse">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Sport</h3>
              <p className="text-sm text-gray-400">Games & Tournaments</p>
            </Link>

            {/* Food */}
            <Link
              to="/events?category=food"
              className="group bg-gray-800/50 hover:bg-linear-to-br from-orange-500/20 to-yellow-500/20 border border-gray-700 hover:border-orange-500 rounded-xl p-6 text-center transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-linear-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center group-hover:animate-pulse">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Food</h3>
              <p className="text-sm text-gray-400">Culinary Events</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Events Grid Section */}
      <section className="bg-linear-to-r from-gray-900 to-gray-800 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Featured <span className="text-[#f91942]">Events</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover our most popular events and experiences
            </p>
          </div>

          {/* Events Grid */}
          {events.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {events.slice(0, 5).map((event) => (
                  <EventCard key={event.id} event={event} isAdmin={false} />
                ))}
              </div>

              {/* View More Button */}
              <div className="mt-12 text-center">
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 px-8 py-3 text-lg font-medium tracking-wide text-white bg-linear-to-r from-[#f91942] to-[#ff4d6d] rounded-xl hover:from-[#e0183b] hover:to-[#e93d5e] hover:shadow-lg hover:shadow-[#f91942]/30 transition-all duration-300"
                >
                  View All Events
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No events available
              </h3>
              <p className="text-gray-400">
                Check back soon for upcoming events
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 py-20 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('/pattern-grid.svg')]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              What <span className="text-[#f91942]">People Say</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join thousands of satisfied event-goers and organizers
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Music Festival Attendee",
                content:
                  "The best event platform I've used! Found amazing concerts and met incredible people.",
                rating: 5,
                avatar: "AJ",
              },
              {
                name: "Sarah Miller",
                role: "Event Organizer",
                content:
                  "Managing events has never been easier. The analytics and tools are exceptional.",
                rating: 5,
                avatar: "SM",
              },
              {
                name: "David Chen",
                role: "Regular Attendee",
                content:
                  "From workshops to concerts, always find something interesting. Highly recommended!",
                rating: 5,
                avatar: "DC",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-[#f91942] transition-all duration-300 hover:transform hover:scale-[1.02]"
              >
                {/* Rating */}
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 italic mb-8">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-linear-to-r from-[#f91942] to-[#f0516e] rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
