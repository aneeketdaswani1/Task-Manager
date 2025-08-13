import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import { useAuth } from '../context/AuthContext';

const Events = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get('/api/events', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEvents(response.data);
      } catch (error) {
        alert('Failed to fetch events.');
      }
    };

    if (user?.token) {
      fetchEvents();
    }
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <EventForm
        events={events}
        setEvents={setEvents}
        editingEvent={editingEvent}
        setEditingEvent={setEditingEvent}
        user={user}
      />
      <EventList
        events={events}
        setEvents={setEvents}
        setEditingEvent={setEditingEvent}
        user={user}
      />
    </div>
  );
};

export default Events;
