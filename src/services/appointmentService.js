const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');

class AppointmentService {
    async checkAvailability(professorId, date) {
        const appointments = await Appointment.find({ professor: professorId, timeSlot: date });
        return appointments.length === 0;
    }

    async bookAppointment(studentId, professorId, timeSlot) {
        const appointment = new Appointment({
            student: studentId,
            professor: professorId,
            timeSlot,
            status: 'booked'
        });
        await appointment.save();
        return appointment;
    }

    async getAppointments(studentId) {
        return await Appointment.find({ student: studentId });
    }
}

module.exports = new AppointmentService();