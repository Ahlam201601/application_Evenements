import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EventPost } from "../../api/eventsApi";
import toast from "react-hot-toast";

export default function AddEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    price: "",
    image: "",
  });

  const navigate =useNavigate();
  const [loadingImg, setLoadingImg] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ---------- Upload Cloudinary (نفسو لي كان عندك) ----------
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingImg(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "events");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dqhakngxl/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setForm({ ...form, image: data.secure_url });
    setLoadingImg(false);
  };

  // ---------- Validation ----------
  const validate = () => {
    let temp = {};
    if (!form.title) temp.title = "Title is required";
    if (!form.description) temp.description = "Description is required";
    if (!form.category) temp.category = "Category is required";
    if (!form.date) temp.date = "Date is required";
    if (!form.price) temp.price = "Price is required";
    if (!form.image) temp.image = "Image is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // ---------- Click Add ----------
  const handleAddClick = () => {
    if (validate()) setShowConfirm(true);
  };

  // ---------- Confirm Submit ----------
  const handleSubmit = async () => {
    setShowConfirm(false);
    setLoading(true);

    try {
      const eventData = {
        ...form,
        price: Number(form.price),
      };

      await EventPost(eventData);

      toast.success("Event added successfully 🎉");

      setForm({
        title: "",
        description: "",
        category: "",
        date: "",
        price: "",
        image: "",
      });

      setErrors({});

      setTimeout(() => {
      navigate("/admin");
    }, 500);
    
    } catch (err) {
      toast.error("Error while adding event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ---------- MAIN FORM MODAL  ---------- */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="relative bg-white w-full max-w-lg p-8 rounded-xl shadow-xl">
          <button
            onClick={() => navigate("/admin")}
            className="absolute right-4 top-4 text-gray-500 hover:text-black"
          >
            <FaTimes size={20} />
          </button>

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Add New Event
          </h2>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Event title"
              className="w-full border rounded-lg px-4 py-3"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}

            <textarea
              placeholder="Event description"
              rows="3"
              className="w-full border rounded-lg px-4 py-3"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}

            <select
              className="w-full border rounded-lg px-4 py-3"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select a category</option>
              <option value="Music">Music</option>
              <option value="Art">Art</option>
              <option value="Show">Show</option>
              <option value="Football">Football</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}

            <input
              type="date"
              className="w-full border rounded-lg px-4 py-3"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}

            <input
              type="number"
              placeholder="Ticket price"
              className="w-full border rounded-lg px-4 py-3"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}

            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-lg px-4 py-3"
              onChange={handleImageUpload}
            />

            {loadingImg && (
              <p className="text-sm text-gray-500 mt-2">Uploading...</p>
            )}

            {form.image && (
              <img
                src={form.image}
                className="mt-3 h-32 object-cover rounded"
                alt="preview"
              />
            )}

            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image}</p>
            )}

            <div className="flex justify-end pt-4">
              <button
                onClick={handleAddClick}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Add Event
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ---------- CONFIRM MODAL ---------- */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl">
            <h3 className="text-xl font-bold mb-4">Confirm Add Event ?</h3>

            <div className="flex justify-end space-x-3 pt-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
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
