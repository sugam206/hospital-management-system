const Joi = require("joi");

const laboratoryValidator = Joi.object({
    patientId: Joi.string().required(),
    doctorId: Joi.string().required(),
    testType: Joi.string().required(),
    requestedDate: Joi.date().optional(),
    resultDate: Joi.date().optional(),
    result: Joi.string().optional(),
    status: Joi.string().valid("pending", "completed", "cancelled").default("pending")
});

module.exports = laboratoryValidator;
