const Assignment = require('../models/Assignment');

const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ userId: req.user.id });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addAssignment = async (req, res) => {
  const { title, course, dueDate, description } = req.body;
  try {
    const assignment = await Assignment.create({
      userId: req.user.id,
      title,
      course,
      dueDate,
      description,
    });
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAssignment = async (req, res) => {
  const { title, course, dueDate, description } = req.body;
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    if (assignment.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    assignment.title = title ?? assignment.title;
    assignment.course = course ?? assignment.course;
    assignment.dueDate = dueDate ?? assignment.dueDate;
    assignment.description = description ?? assignment.description;

    const updatedAssignment = await assignment.save();
    res.json(updatedAssignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    if (assignment.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    await assignment.deleteOne();
    res.json({ message: 'Assignment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAssignments, addAssignment, updateAssignment, deleteAssignment };
