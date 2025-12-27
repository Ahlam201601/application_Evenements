import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EventPost } from "../../api/eventsApi";
import toast from "react-hot-toast";

const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;

export default function AddEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    location: "",
    price: "",
    image: "",
  });

  const navigate = useNavigate();
  const [loadingImg, setLoadingImg] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingImg(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "events");

    const res = await fetch(
      CLOUDINARY_UPLOAD_URL,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    setForm({ ...form, image: data.secure_url });
    setLoadingImg(false);
  };

  const validate = () => {
    let temp = {};
    if (!form.title) temp.title = "Title is required";
    if (!form.description) temp.description = "Description is required";
    if (!form.category) temp.category = "Category is required";
    if (!form.date) temp.date = "Date is required";
    if (!form.location) temp.location = "Location is required";
    if (!form.price) temp.price = "Price is required";
    if (!form.image) temp.image = "Image is required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleAddClick = () => {
    if (validate()) setShowConfirm(true);
  };

  const handleSubmit = async () => {
    setShowConfirm(false);
    setLoading(true);

    try {
      await EventPost({ ...form, price: Number(form.price) });

      toast.success("Event added successfully 🎉");

      setForm({
        title: "",
        description: "",
        category: "",
        date: "",
        location: "",
        price: "",
        image: "",
      });

      setErrors({});
      navigate("/admin");
    } catch {
      toast.error("Error while adding event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* MAIN MODAL */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-3">
        <div className="relative bg-white w-full max-w-xl sm:max-w-2xl p-5 sm:p-8 rounded-2xl shadow-2xl border border-indigo-100">
          <button
            onClick={() => navigate("/admin")}
            className="absolute right-4 top-4 text-gray-500 hover:text-black"
          >
            <FaTimes size={18} />
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-gray-800">
            Add New Event
          </h2>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* title */}
            <input
              type="text"
              placeholder="Event title"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-indigo-400 outline-none"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}

            {/* description */}
            <textarea
              rows="3"
              placeholder="Event description"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-indigo-400 outline-none"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}

            {/* CATEGORY + PRICE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <select
                  className="w-full border rounded-lg px-4 py-3"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option value="">Select a category</option>
                  <option value="Music">Music</option>
                  <option value="Art">Art</option>
                  <option value="Show">Show</option>
                  <option value="Football">Football</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Ticket price"
                  className="w-full border rounded-lg px-4 py-3"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>
            </div>

            {/* DATE + LOCATION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="date"
                  className="w-full border rounded-lg px-4 py-3"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full border rounded-lg px-4 py-3"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>
            </div>

            {/* Image */}
            <input
              type="file"
              accept="image/*"
              className="w-full border border-gray-200 rounded-xl px-4 py-3"
              onChange={handleImageUpload}
            />

            {loadingImg && (
              <p className="text-sm text-gray-500 mt-2">Uploading...</p>
            )}

            {form.image && (
              <img
                src={form.image}
                className="mt-3 max-h-48 w-full object-cover rounded-xl"
                alt="preview"
              />
            )}

            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image}</p>
            )}

            <div className="flex justify-end pt-3">
              <button
                onClick={handleAddClick}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
              >
                Add Event
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-3">
          <div className="bg-white w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-indigo-100 flex flex-col items-center text-center space-y-4">
            {/* ICON */}
            <div className="bg-indigo-100 text-indigo-600 w-16 h-16 flex items-center justify-center rounded-full text-3xl">
              ✅
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
              Confirm Add Event?
            </h3>

            <p className="text-gray-500 text-sm sm:text-base">
              Are you sure you want to add this event? This action cannot be
              undone.
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 w-full mt-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                {loading ? "Adding..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
