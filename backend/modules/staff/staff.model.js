const mongoose = require("mongoose");
const staffSchema = new mongoose.Schema({
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true },
    },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: {
        type: String,
        enum: ["doctor", "nurse", "receptionist", "admin", "lab_technician", "pharmacist"],
        required: true,
    },
    department: { type: String },
    shift: { type: String, enum: ["morning", "evening", "night"], default: "morning" },
    salary: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false },
},
    { timestamps: true }
);
module.exports = mongoose.model("Staff", staffSchema);