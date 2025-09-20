const Joi = require("joi");

const pharmacyValidator = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    manufacturer: Joi.string().optional(),
    batchNumber: Joi.string().required(),
    expiryDate: Joi.date().required(),
    quantity: Joi.number().integer().positive().required(),
    price: Joi.number().positive().required(),
    supplier: Joi.string().optional()
});

module.exports = pharmacyValidator;
