const mongoose = require("mongoose");

const laboratorySchema = new mongoose.Schema(
    {
        patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
        doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
        testType: { type: String, required: true }, // e.g., Blood Test, X-Ray
        requestedDate: { type: Date, default: Date.now },
        resultDate: { type: Date },
        result: { type: String }, // e.g., "Normal", "Abnormal", or detailed notes
        status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
        isDeleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Laboratory", laboratorySchema);
