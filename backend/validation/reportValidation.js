const Joi = require("joi");

const reportValidation = Joi.object({
    patientId: Joi.string().required(),
    doctorId: Joi.string().required(),
    type: Joi.string().valid("lab", "radiology", "discharge", "other").required(),
    description: Joi.string().required(),
    fileUrl: Joi.string().uri().allow(""),
});

module.exports = reportValidation;
