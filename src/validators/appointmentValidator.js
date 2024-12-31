const Joi = require('joi');

const bookAppointmentSchema = Joi.object({
  professorId: Joi.string().required(),
  timeSlot: Joi.string().required()
});

module.exports = {
  bookAppointmentSchema
};