const Task = require('../models/Task');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add task
const addTask = async (req, res) => {
  const { title, description, deadline } = req.body;
  try {
    const task = await Task.create({ userId: req.user.id, title, description, deadline });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, deadline, completed } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title, description, deadline, completed },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask
};