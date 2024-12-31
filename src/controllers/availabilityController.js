const Availability = require('../models/availabilityModel');

exports.addAvailability = async (req, res) => {
  const { timeSlots } = req.body;
  try {
    if (!timeSlots || !Array.isArray(timeSlots)) {
      return res.status(400).json({ message: 'Time slots are required and should be an array' });
    }
    const availability = new Availability({ professor: req.user.id, timeSlots });
    await availability.save();
    res.status(201).json(availability);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAvailability = async (req, res) => {
  const { timeSlots } = req.body;
  try {
    if (!timeSlots || !Array.isArray(timeSlots)) {
      return res.status(400).json({ message: 'Time slots are required and should be an array' });
    }
    const availability = await Availability.findOneAndUpdate(
      { professor: req.user.id },
      { timeSlots },
      { new: true, upsert: true }
    );
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteAvailability = async (req, res) => {
  try {
    await Availability.findOneAndDelete({ professor: req.user.id });
    res.status(200).json({ message: 'Availability deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};