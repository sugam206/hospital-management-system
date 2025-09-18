const Doctor = require("../modules/doctors/doctor.model");
const doctorValidation = require("../validation/doctorValidation");

const createDoctor = async (req, res) => {
    try {
        const { error } = doctorValidation.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const doctor = new Doctor(req.body);
        await doctor.save()
        res.status(201).json(doctor)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getDoctor = async (req, res) => {
    try {
        const page = toString(req.query.page) || 1;
        const limit = toString(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const doctors = await Doctor.find({ isDeleted: false }).skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await Doctor.countDocuments({ isDeleted: false });
        res.json({ total, page, limit, doctors })
    } catch (error) {
        res.status(500).json({ message: err.message });

    }
};
const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor || doctor.isDeleted) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}
const updateDoctor = async (req, res) => {
    try {
        const { error } = doctorValidation.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!doctor || doctor.isDeleted) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};
const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(
            req.params.id, req.body, { isDeleted: true }, { new: true }
        );
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        res.json({ message: "Doctor deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}
module.exports =
{
    createDoctor,
    getDoctor,
    getDoctorById,
    updateDoctor,
    deleteDoctor
}
    ;