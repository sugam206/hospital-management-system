const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
        doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
        type: { type: String, enum: ["lab", "radiology", "discharge", "other"], required: true },
        description: { type: String, required: true },
        fileUrl: { type: String }, // e.g. uploaded PDF
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
