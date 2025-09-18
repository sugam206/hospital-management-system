const joi = require("joi");
const medicalRecordValidatior = joi.object({
    patientId: Joi.string().required(),
    doctorId: Joi.string().required(),
    diagnosis: Joi.string().required(),
    prescription: Joi.string().optional(),
    labTests: Joi.array().items(Joi.string()).optional(),
    visitDate: Joi.date().optional(),
    notes: Joi.string().optional()
})
module.exports = medicalRecordValidatior;