const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["ADMIN", "DOCTOR", "NURSE", "RECEPTION", "PATIENTS"], default: "PATIENTS" },

}, { timestamps: true })
module.exports = mongoose.model('User', userSchema);
