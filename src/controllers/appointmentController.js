const Appointment = require('../models/appointmentModel');
const Availability = require('../models/availabilityModel');
const User = require('../models/userModel');
const { sendEmail } = require('../services/emailService');

exports.bookAppointment = async (req, res) => {
  const { professorId, timeSlot } = req.body;
  try {
    if (!professorId || !timeSlot) {
      return res.status(400).json({ message: 'Professor ID and time slot are required' });
    }
    const appointment = new Appointment({
      student: req.user.id,
      professor: professorId,
      timeSlot,
    });
    await appointment.save();

    const student = await User.findById(req.user.id);
    const professor = await User.findById(professorId);

    // Send email notifications
    await sendEmail(student.email, 'Appointment Confirmation', `Your appointment with Professor ${professor.name} is confirmed for ${timeSlot}.`);
    await sendEmail(professor.email, 'New Appointment', `You have a new appointment with Student ${student.name} for ${timeSlot}.`);

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAvailableSlots = async (req, res) => {
  const { professorId } = req.query;
  try {
    if (!professorId) {
      return res.status(400).json({ message: 'Professor ID is required' });
    }
    const availability = await Availability.findOne({ professor: professorId });
    if (!availability) {
      return res.status(404).json({ message: 'No availability found' });
    }
    res.json(availability.timeSlots);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ $or: [{ student: req.user.id }, { professor: req.user.id }] });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.cancelAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    if (appointment.student.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only cancel your own appointments' });
    }
    await appointment.remove();

    const student = await User.findById(req.user.id);
    const professor = await User.findById(appointment.professor);

    // Send email notifications
    await sendEmail(student.email, 'Appointment Cancellation', `Your appointment with Professor ${professor.name} for ${appointment.timeSlot} has been cancelled.`);
    await sendEmail(professor.email, 'Appointment Cancellation', `Your appointment with Student ${student.name} for ${appointment.timeSlot} has been cancelled.`);

    res.status(200).json({ message: 'Appointment cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};