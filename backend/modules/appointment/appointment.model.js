const mongoose = require("mongoose")
const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    date: { type: Date, required: true },
    reason: { type: String },
    status: {
        type: string,
        enum: ["scheduled", "completed", "cancelled"],
        default: "scheduled"
    },
    notes: { type: String },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true })
module.exports = mongoose.model("Appointment", appointmentSchema);