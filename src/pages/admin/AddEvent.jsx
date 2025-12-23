import React from 'react'

export default function AddEvent({ closeModal }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Add New Event</h2>

        <form className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Category"
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
