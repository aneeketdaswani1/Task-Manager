import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const EventForm = ({ events, setEvents, editingEvent, setEditingEvent }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    location: '',
  });

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title || '',
        description: editingEvent.description || '',
        start: editingEvent.start ? editingEvent.start.slice(0, 10) : '',
        end: editingEvent.end ? editingEvent.end.slice(0, 10) : '',
        location: editingEvent.location || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        start: '',
        end: '',
        location: '',
      });
    }
  }, [editingEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user?.token) {
        alert('You must be logged in');
        return;
      }

      if (editingEvent) {
        // Update existing event
        const response = await axiosInstance.put(
          `/api/events/${editingEvent._id}`,
          formData,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setEvents(events.map(ev => (ev._id === response.data._id ? response.data : ev)));
        setEditingEvent(null);
      } else {
        // Add new event
        const response = await axiosInstance.post(
          '/api/events',
          formData,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setEvents([...events, response.data]);
      }
      setFormData({
        title: '',
        description: '',
        start: '',
        end: '',
        location: '',
      });
    } catch (error) {
      alert('Failed to save event.');
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      start: '',
      end: '',
      location: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingEvent ? 'Edit Event' : 'Add Event'}</h1>

      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={e => setFormData({ ...formData, title: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={e => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        rows={3}
      />

      <label className="block mb-1 font-semibold">Start Date</label>
      <input
        type="date"
        value={formData.start}
        onChange={e => setFormData({ ...formData, start: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <label className="block mb-1 font-semibold">End Date</label>
      <input
        type="date"
        value={formData.end}
        onChange={e => setFormData({ ...formData, end: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={e => setFormData({ ...formData, location: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingEvent ? 'Update Event' : 'Add Event'}
      </button>

      {editingEvent && (
        <button
          type="button"
          onClick={handleCancel}
          className="w-full mt-2 bg-gray-400 text-white p-2 rounded"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default EventForm;
