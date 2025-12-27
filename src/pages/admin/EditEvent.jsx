import { useState, useRef } from "react";
import { updateEvent } from "../../api/eventsApi";
import toast from "react-hot-toast";

export default function EditEvent({ event, onClose }) {
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

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Handle image selection & preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setForm({ ...form, image: preview, file }); 
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { id, file, ...data } = form;

      await updateEvent(id, {
        ...data,
        price: Number(form.price) || 0,
      });

      toast.success("Event updated successfully 🎉");
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Error while updating event ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-2xl border border-indigo-100">
      <h2 className="text-2xl font-bold mb-4">Edit Event</h2>

      {/* TITLE */}
      <input
        type="text"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full border px-4 py-2 rounded mb-2"
        placeholder="Title"
      />

      {/* DESCRIPTION */}
      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full border px-4 py-2 rounded mb-2"
        placeholder="Description"
      />

      {/* CATEGORY */}
      <select
        className="w-full border px-4 py-2 rounded mb-2"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option value="">Select a category</option>
        <option value="Music">Music</option>
        <option value="Art">Art</option>
        <option value="Sport">Sport</option>
        <option value="Festival">Festival</option>
      </select>

      {/* DATE */}
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="w-full border px-4 py-2 rounded mb-2"
      />

      {/* LOCATION */}
      <input
        type="text"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        className="w-full border px-4 py-2 rounded mb-2"
        placeholder="Location"
      />

      {/* PRICE */}
      <input
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="w-full border px-4 py-2 rounded mb-2"
        placeholder="Ticket price"
      />

      {/* IMAGE UPLOAD */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
      />

      {/* IMAGE PREVIEW */}
      {form.image && (
        <img
          src={form.image}
          alt="preview"
          className="w-40 h-40 object-cover rounded mb-3 border cursor-pointer"
          onClick={() => fileInputRef.current.click()}
        />
      )}

      <p
        className="text-sm text-indigo-600 cursor-pointer mb-3"
        onClick={() => fileInputRef.current.click()}
      >
        Click to change image
      </p>

      <div className="flex justify-end gap-2 mt-3">
        <button onClick={onClose} className="px-4 py-2 border rounded">
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
}
