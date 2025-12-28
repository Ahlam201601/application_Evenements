import { useState, useEffect } from "react";
import { getEvents } from "../api/eventsApi";
import EventCard from "../components/EventCard";
import { FaFilter, FaSearch } from "react-icons/fa";

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
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 pt-24">
        
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Explore Popular Events
          </h1>
        </div>

        {/* SEARCH & FILTER */}
        <div className="mb-8 bg-gray-800 border border-slate-700 shadow-xl rounded-2xl px-6 py-5">
          
          {/* SEARCH */}
          <div className="mb-5">
            <h3 className="flex items-center gap-2 text-white font-semibold mb-3">
              <FaSearch className="text-indigo-400" />
              Search by Name
            </h3>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-700 text-white border-2 border-slate-600 rounded-lg px-4 py-3 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* FILTER */}
          <div>
            <h3 className="flex items-center gap-2 text-white font-semibold mb-3">
              <FaFilter className="text-indigo-400" />
              Category
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-lg font-medium text-sm transition-all border-2 ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* COUNT */}
          <div className="mt-4 pt-4 border-t border-slate-700">
            <p className="text-slate-400 text-sm">
              <span className="text-indigo-400 font-semibold">{filteredEvents.length}</span> events found
            </p>
          </div>
        </div>

        {/* EVENTS GRID */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} isAdmin={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
            <p className="text-slate-400">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
}