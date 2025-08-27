const Patient = require("../modules/patients/patient.model");
const patientsValidation = require("../validation/patientValidation");

const createPatients = async (req, res) => {
    try {
        const { error } = patientsValidation.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const mrn = await Patient.generateMRN();
        const newPatient = new Patient({ ...req.body, mrn, userId: req.user._id });
        const savePatient = await newPatient.save();
        res.status(201).json(savePatient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const getPatients = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = parseInt(page - 1) * limit;
        const patients = await Patient.find({ isDeleted: false })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        const total = await Patient.countDocuments({ isDeleted: false });
        res.json({ total, page, limit, patients });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const getPatientsById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient || patient.isDeleted) return res.status(404).json({ message: "Patient not found" });
        res.json(patient);


    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const updatePatient = async (req, res) => {
    try {
        const { error } = patientValidation.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPatient) return res.status(404).json({ message: "Patient not found" });

        res.json(updatedPatient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const deletePatient = async (req, res) => {
    try {
        const deletedPatient = await Patient.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
        if (!deletedPatient) return res.status(404).json({ message: "Patient not found" });

        res.json({ message: "Patient deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports = {
    createPatients,
    getPatients,
    getPatientsById,
    updatePatient,
    deletePatient
}