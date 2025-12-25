import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
// import AddEvent from "./AddEvent";



import { getEvents } from "../../api/eventsApi";

export default function EventsList() {
  const [events, setEvents] = useState([]);
  // const [open , setOpen] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="pl-11 w-full transition ">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Event Management</h1>

           <button
          onClick={() => navigate("/admin/add")}
          className="bg-green-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          + Add Event
        </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow p-6 flex flex-col justify-between"
            >
              <div className="bg-white rounded-xl shadow overflow-hidden">
                {/* Image */}
                <img
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />

                {/* Text content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-gray-500 mt-2">{event.description}</p>
                  <p className="text-sm text-gray-400 mt-1">{event.date}</p>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button className="text-blue-600 hover:text-blue-800">
                  <FiEdit2 size={20} />
                </button>

                <button className="text-red-600 hover:text-red-800">
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* {open && <AddEvent closeModal={()=> setOpen(false)}/>} */}
    </>
  );
}
