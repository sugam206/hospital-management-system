const Joi = require("joi");

const billingValidator = Joi.object({
    patientId: Joi.string().required(),
    doctorId: Joi.string().required(),
    services: Joi.array()
        .items(
            Joi.object({
                description: Joi.string().required(),
                cost: Joi.number().positive().required()
            })
        )
        .required(),
    totalAmount: Joi.number().positive().required(),
    paymentStatus: Joi.string().valid("pending", "paid", "cancelled").default("pending"),
    paymentMethod: Joi.string().valid("cash", "card", "insurance").required(),
    transactionDate: Joi.date().optional()
});

module.exports = billingValidator;
