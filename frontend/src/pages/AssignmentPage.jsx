import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({ title: "", dueDate: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const res = await axios.get("/api/assignments");
    setAssignments(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`/api/assignments/${editId}`, formData);
      setEditId(null);
    } else {
      await axios.post("/api/assignments", formData);
    }
    setFormData({ title: "", dueDate: "" });
    fetchAssignments();
  };

  const handleEdit = (assignment) => {
    setFormData({ title: assignment.title, dueDate: assignment.dueDate });
    setEditId(assignment._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/assignments/${id}`);
    fetchAssignments();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-green-600 mb-6">📝 Manage Assignments</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Assignment Title"
            className="border rounded-lg p-2 flex-1"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <input
            type="date"
            className="border rounded-lg p-2"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            required
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            {editId ? "Update" : "Add"}
          </button>
        </form>

        {/* Assignments List */}
        <ul className="space-y-4">
          {assignments.map((assignment) => (
            <li
              key={assignment._id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <div>
                <p className="font-semibold">{assignment.title}</p>
                <p className="text-sm text-gray-500">
                  Due: {new Date(assignment.dueDate).toDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(assignment)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(assignment._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
