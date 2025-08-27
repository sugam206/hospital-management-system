const Joi = require("joi");

const patientValidation = Joi.object({
    name: Joi.object({
        first: Joi.string().required(),
        last: Joi.string().required()
    }).required(),
    dob: Joi.date().required(),
    sex: Joi.string().valid("male", "female", "other").required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    allergies: Joi.array().items(Joi.string()),
    chronicConditions: Joi.array().items(Joi.string()),
    emergencyContact: Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().required(),
        relation: Joi.string().required()
    }).required()
});

module.exports = patientValidation;
