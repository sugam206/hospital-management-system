const MedicalRecord = require("../modules/medicalRecord/medicalRecord.model");
const medicalRecordValidator = require("../validation/medicalRecord.validation");

// Create record
const createRecord = async (req, res) => {
    try {
        const { error } = medicalRecordValidator.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const record = new MedicalRecord(req.body);
        await record.save();
        res.status(201).json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all records (pagination)
const getRecords = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const records = await MedicalRecord.find({ isDeleted: false })
            .populate("patientId", "name phone")
            .populate("doctorId", "name specialization")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await MedicalRecord.countDocuments({ isDeleted: false });

        res.json({ total, page, limit, records });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single record
const getRecordById = async (req, res) => {
    try {
        const record = await MedicalRecord.findById(req.params.id)
            .populate("patientId", "name phone")
            .populate("doctorId", "name specialization");

        if (!record || record.isDeleted) {
            return res.status(404).json({ message: "Medical record not found" });
        }

        res.json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update record
const updateRecord = async (req, res) => {
    try {
        const { error } = medicalRecordValidator.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const record = await MedicalRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!record || record.isDeleted) {
            return res.status(404).json({ message: "Medical record not found" });
        }

        res.json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete record (soft delete)
const deleteRecord = async (req, res) => {
    try {
        const record = await MedicalRecord.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        );
        if (!record) return res.status(404).json({ message: "Medical record not found" });

        res.json({ message: "Medical record deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createRecord,
    getRecords,
    getRecordById,
    updateRecord,
    deleteRecord
};
