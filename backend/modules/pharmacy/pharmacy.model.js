const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema(
    {
        name: { type: String, required: true }, // Medicine name
        category: { type: String, required: true }, // e.g., Antibiotic, Painkiller
        manufacturer: { type: String },
        batchNumber: { type: String, required: true },
        expiryDate: { type: Date, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        supplier: { type: String },
        isDeleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Pharmacy", pharmacySchema);
