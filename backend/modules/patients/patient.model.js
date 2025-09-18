const mongoose = require("mongoose");
const emergencyContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    relation: { type: String, required: true }
});

const patientSchema = new mongoose.Schema({
    mrn: { type: String, required: true, unique: true, index: true },
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    dob: { type: Date, required: true },
    sex: { type: String, enum: ["male", "female", "other"], required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    allergies: [{ type: String }],
    chronicConditions: [{ type: String }],
    emergencyContact: emergencyContactSchema,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false }



}, { timestamps: true });
patientSchema.statics.generateMRN = async function () {
    const count = await this.countDocuments();
    const seq = (count + 1).toString().padStart(4, "0");
    const date = new date();
    const datePart = today.toISOString().split("T")[0].replace(/-/g, "");
    return `P-${datePart}-${seq}`;

};
module.exports = mongoose.model("Patients", patientSchema);