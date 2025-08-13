import React, { useState, useEffect } from 'react';

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({ title: '', course: '', dueDate: '', description: '' });

  useEffect(() => { fetchAssignments(); }, []);

  const fetchAssignments = async () => {
    const res = await fetch('/api/assignments');
    const data = await res.json();
    setAssignments(data);
  };

  const createAssignment = async () => {
    await fetch('/api/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ title: '', course: '', dueDate: '', description: '' });
    fetchAssignments();
  };

  const deleteAssignment = async (id) => {
    await fetch(`/api/assignments/${id}`, { method: 'DELETE' });
    fetchAssignments();
  };

  return (
    <div>
      <h2>Assignments</h2>
      <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
      <input placeholder="Course" value={form.course} onChange={e=>setForm({...form, course:e.target.value})} />
      <input type="datetime-local" value={form.dueDate} onChange={e=>setForm({...form, dueDate:e.target.value})} />
      <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}></textarea>
      <button onClick={createAssignment}>Add Assignment</button>

      <ul>
        {assignments.map(a => (
          <li key={a._id}>
            {a.title} - {a.course} (Due {new Date(a.dueDate).toLocaleString()})
            <button onClick={() => deleteAssignment(a._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
