const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema(
    {
        patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
        doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
        diagnosis: { type: String, required: true },
        prescription: { type: String },
        labTests: [{ type: String }],
        visitDate: { type: Date, default: Date.now },
        notes: { type: String },
        isDeleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);
