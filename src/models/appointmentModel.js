const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timeSlot: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);