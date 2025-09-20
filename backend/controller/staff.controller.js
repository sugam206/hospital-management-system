const Staff = require("../modules/staff/staff.model");
const staffValidation = require("../validation/staffValidation");

const createStaff = async (req, res) => {
    try {
        const { error } = staffValidation.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const newStaff = new Staff({ ...req.body, userId: req.user._id });
        const savedStaff = await newStaff.save();

        res.status(201).json(savedStaff);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getStaff = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const staff = await Staff.find({ isDeleted: false })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Staff.countDocuments({ isDeleted: false });

        res.json({ total, page, limit, staff });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getStaffById = async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);
        if (!staff || staff.isDeleted) return res.status(404).json({ message: "Staff not found" });

        res.json(staff);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateStaff = async (req, res) => {
    try {
        const { error } = staffValidation.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStaff) return res.status(404).json({ message: "Staff not found" });

        res.json(updatedStaff);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteStaff = async (req, res) => {
    try {
        const deletedStaff = await Staff.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        );
        if (!deletedStaff) return res.status(404).json({ message: "Staff not found" });

        res.json({ message: "Staff deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createStaff,
    getStaff,
    getStaffById,
    updateStaff,
    deleteStaff,
};
