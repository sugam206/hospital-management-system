const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema(
    {
        patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
        doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
        services: [
            {
                description: { type: String, required: true },
                cost: { type: Number, required: true }
            }
        ],
        totalAmount: { type: Number, required: true },
        paymentStatus: { type: String, enum: ["pending", "paid", "cancelled"], default: "pending" },
        paymentMethod: { type: String, enum: ["cash", "card", "insurance"], required: true },
        transactionDate: { type: Date, default: Date.now },
        isDeleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Billing", billingSchema);
