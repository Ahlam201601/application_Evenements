import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../api/eventsApi";
import EventCard from "../components/EventCard";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer"

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <Navbar/>
    
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="text-xl font-semibold text-white mb-2">No events available</h3>
              <p className="text-gray-400">Check back soon for upcoming events</p>
            </div>
          )}
        </div>
      </section>
      <Footer/>
    </>
  );
}