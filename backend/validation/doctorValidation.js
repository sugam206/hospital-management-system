const joi = require("joi");

const doctorValidation = joi.object({
    name: joi.string().required(),
    specialization: joi.string().required(),
    phone: joi.string().pattern(/^[0-9]{10}$/).required(),
    email: joi.string().email().required(),
    schedule: joi.array().items(
        joi.object({
            day: joi.string().valid("mon", "tue", "wed", "thu", "fri", "sat", "sun").required(),
            time: joi.string().required()
        }),
    ).optional(),
})
module.exports = doctorValidation;