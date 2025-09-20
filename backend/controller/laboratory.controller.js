const Laboratory = require("../modules/laboratory/laboratory.model");
const laboratoryValidator = require("../validation/laboratoryValidation");

// Create lab request
const createLabRequest = async (req, res) => {
    try {
        const { error } = laboratoryValidator.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const labRequest = new Laboratory(req.body);
        await labRequest.save();
        res.status(201).json(labRequest);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all lab requests (pagination)
const getLabRequests = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const labs = await Laboratory.find({ isDeleted: false })
            .populate("patientId", "name phone")
            .populate("doctorId", "name specialization")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Laboratory.countDocuments({ isDeleted: false });

        res.json({ total, page, limit, labs });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single lab request
const getLabRequestById = async (req, res) => {
    try {
        const lab = await Laboratory.findById(req.params.id)
            .populate("patientId", "name phone")
            .populate("doctorId", "name specialization");

        if (!lab || lab.isDeleted) return res.status(404).json({ message: "Lab request not found" });

        res.json(lab);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update lab request (for results/status)
const updateLabRequest = async (req, res) => {
    try {
        const { error } = laboratoryValidator.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const lab = await Laboratory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!lab || lab.isDeleted) return res.status(404).json({ message: "Lab request not found" });

        res.json(lab);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete lab request (soft delete)
const deleteLabRequest = async (req, res) => {
    try {
        const lab = await Laboratory.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
        if (!lab) return res.status(404).json({ message: "Lab request not found" });

        res.json({ message: "Lab request deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createLabRequest,
    getLabRequests,
    getLabRequestById,
    updateLabRequest,
    deleteLabRequest
};
