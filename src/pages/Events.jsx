import { useState, useEffect } from "react";
import { getEvents } from "../api/eventsApi";
import EventCard from "../components/EventCard";
import { FaFilter, FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);

  const categories = ["All", "Music", "Art", "Show", "Football"];

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 pt-24">
        
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Explore Popular Events
          </h1>
          <p className="text-gray-400">Discover amazing events around you</p>
        </div>

        {/* SEARCH & FILTER */}
        <div className="mb-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-2xl rounded-2xl px-6 py-5">
          
          {/* SEARCH */}
          <div className="mb-5">
            <h3 className="flex items-center gap-2 text-white font-semibold mb-3">
              <FaSearch className="text-[#f91942]" />
              Search by Name
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900/80 text-white border-2 border-gray-700 rounded-xl px-4 py-3 pl-10 focus:border-[#f91942] focus:outline-none focus:ring-1 focus:ring-[#f91942] transition-all"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* FILTER */}
          <div>
            <h3 className="flex items-center gap-2 text-white font-semibold mb-3">
              <FaFilter className="text-[#f91942]" />
              Category
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedCategory === cat
                      ? "bg-[#f91942] text-white shadow-lg shadow-[#f91942]/20"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* COUNT */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              <span className="text-[#f91942] font-semibold">{filteredEvents.length}</span> events found
            </p>
          </div>
        </div>

        {/* EVENTS GRID */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} isAdmin={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
            <p className="text-gray-400">Try a different search or category</p>
            <button 
              onClick={() => {setSelectedCategory("All"); setSearchQuery("");}}
              className="mt-4 px-6 py-2 bg-[#f91942] text-white rounded-lg hover:bg-[#e0183b] transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}