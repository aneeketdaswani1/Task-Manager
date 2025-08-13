import React from "react";

export default function EventList({ events, onEdit, onDelete }) {
  return (
    <ul className="space-y-4">
      {events.map((event) => (
        <li
          key={event._id}
          className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
        >
          <div>
            <p className="font-semibold">{event.title}</p>
            <p className="text-sm text-gray-500">
              {new Date(event.date).toDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(event)}
              className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(event._id)}
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
