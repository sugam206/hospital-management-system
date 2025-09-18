const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    schedule: [{ day: String, time: String }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });
module.exports = mongoose.model("Doctor", doctorSchema);