const Appointment = require("../modules/appointment/appointment.model");
const appointmentValidator = require("../validation/appointmentValidation");

const createAppointment = async (req, res) => {
    try {
        const { error } = appointmentValidator.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message })
        const appointments = new Appointment;
        appointment.save();
        res.status(201).json(appointments);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getAppointments = async (req, res) => {
    try {
        const page = parseInt(req.query.body) || 1;
        const limit = parseInt(req.query.body) || 10;
        const skip = (page - 1) * limit;
        const appointments = await Appointment.find({ isDeleted: false }).populate("patientId", "name phone").populate("doctorId", "name specialization").skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await Appointment.countDocuments({ isDeleted: false });
        res.json({ total, page, limit, appointments });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getAppointmentById = async (req, res) => {
    try {
        const appointments = await Appointment.find({ isDeleted: false }).populate("patientId", "name phone").populate("doctorId", "name specialization");
        if (!appointments || appointments.isDeleted) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const updateAppointment = async (req, res) => {
    try {
        const { error } = appointmentValidator.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message })
        const appointments = await Appointment.findByIdAndUpdate(req.param.id, req.body, { new: true });
        if (!appointments || appointments.isDeleted) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const deleteAppointment = async (req, res) => {

    try {
        const appointment = await Appointment.findByIdAndUpdate(req.param.id, { isDeleted: true }, { new: true });
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        res.json({ message: "Appointment deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports = {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};