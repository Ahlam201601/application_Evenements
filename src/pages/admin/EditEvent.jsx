import { useState, useRef } from "react";
import { updateEvent } from "../../api/eventsApi";
import toast from "react-hot-toast";

const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;

export default function EditEvent({ event, onClose, onUpdate }) {
  const [form, setForm] = useState({
    title: event.title || "",
    description: event.description || "",
    category: event.category || "",
    date: event.date || "",
    location: event.location || "",
    price: event.price || "",
    image: event.image || "",
    id: event.id,
  });

  const [errors, setErrors] = useState({});
  const [loadingImg, setLoadingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // ---------------- VALIDATION ----------------
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

  // ---------------- UPLOAD IMAGE TO CLOUDINARY ----------------
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingImg(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "events");

    const res = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: data,
    });

    const result = await res.json();

    setForm({ ...form, image: result.secure_url });
    setLoadingImg(false);
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const updatedData = {
        title: form.title,
        description: form.description,
        category: form.category,
        date: form.date,
        location: form.location,
        price: Number(form.price),
        image: form.image,
      };

      await updateEvent(form.id, updatedData);

      // Pass the updated event back to the parent
      onUpdate({ ...updatedData, id: form.id });

      toast.success("Event updated successfully 🎉");
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Error while updating ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4">
      <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">

        <h2 className="text-2xl font-bold text-[#f91942] text-center mb-4">
          Edit Event
        </h2>

        {/* TITLE */}
        <input
          className="w-full border rounded-xl px-4 py-2 mb-1"
          value={form.title}
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

        {/* DESCRIPTION */}
        <textarea
          className="w-full border rounded-xl px-4 py-2 mt-2"
          value={form.description}
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}

        {/* CATEGORY */}
        <select
          className="w-full border rounded-xl px-4 py-2 mt-2"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select category</option>
          <option value="Music">Music</option>
          <option value="Art">Art</option>
          <option value="Sport">Sport</option>
          <option value="Festival">Festival</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}

        {/* DATE */}
        <input
          type="date"
          className="w-full border rounded-xl px-4 py-2 mt-2"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

        {/* LOCATION */}
        <input
          className="w-full border rounded-xl px-4 py-2 mt-2"
          value={form.location}
          placeholder="Location"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location}</p>
        )}

        {/* PRICE */}
        <input
          type="number"
          className="w-full border rounded-xl px-4 py-2 mt-2"
          value={form.price}
          placeholder="Price"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price}</p>
        )}

        {/* IMAGE */}
        <input
          type="file"
          accept="image/*"
          className="mt-3"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        {loadingImg && <p className="text-gray-500 text-sm mt-1">Uploading...</p>}

        {form.image && (
          <img
            src={form.image}
            className="w-40 h-40 object-cover rounded-xl mt-2 border"
          />
        )}

        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image}</p>
        )}

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-[#f91942] text-white"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}