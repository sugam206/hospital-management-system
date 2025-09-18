const Joi = require("joi");

const appointmentValidator = Joi.object({
    patientId: Joi.string().required(),
    doctorId: Joi.string().required(),
    date: Joi.date().greater("now").required(),
    reason: Joi.string().max(200).optional(),
    status: Joi.string().valid("scheduled", "completed", "cancelled").optional(),
    notes: Joi.string().optional()
});

module.exports = appointmentValidator;
