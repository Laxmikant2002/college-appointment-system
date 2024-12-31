const express = require('express');
const { bookAppointment, getAvailableSlots, getAppointments, cancelAppointment } = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const validate = require('../middlewares/validate');
const { bookAppointmentSchema } = require('../validators/appointmentValidator');
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['student']), validate(bookAppointmentSchema), bookAppointment);
router.get('/available-slots', authMiddleware, getAvailableSlots);
router.get('/', authMiddleware, getAppointments);
router.delete('/:id', authMiddleware, roleMiddleware(['student']), cancelAppointment);

module.exports = router;