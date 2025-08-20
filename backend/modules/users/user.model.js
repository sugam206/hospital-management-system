const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    role: { type: String, enum: ["ADMIN", "DOCTOR", "NURSE", "RECEPTION"], required: true },

}, { timestamps: true })
module.exports = mongoose.model('user', userSchema);
