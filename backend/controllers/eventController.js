const Event = require('../models/Event');

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addEvent = async (req, res) => {
  const { title, start, end, description } = req.body;
  try {
    const event = await Event.create({
      userId: req.user.id,
      title,
      start,
      end,
      description,
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  const { title, start, end, description } = req.body;
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    event.title = title ?? event.title;
    event.start = start ?? event.start;
    event.end = end ?? event.end;
    event.description = description ?? event.description;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    await event.deleteOne();
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEvents, addEvent, updateEvent, deleteEvent };
