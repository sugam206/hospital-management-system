const Pharmacy = require("../modules/pharmacy/pharmacy.model");
const pharmacyValidator = require("../validation/pharmacyValidation");

// Create medicine entry
const addMedicine = async (req, res) => {
    try {
        const { error } = pharmacyValidator.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const medicine = new Pharmacy(req.body);
        await medicine.save();
        res.status(201).json(medicine);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all medicines (pagination)
const getMedicines = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const medicines = await Pharmacy.find({ isDeleted: false })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Pharmacy.countDocuments({ isDeleted: false });

        res.json({ total, page, limit, medicines });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single medicine
const getMedicineById = async (req, res) => {
    try {
        const medicine = await Pharmacy.findById(req.params.id);
        if (!medicine || medicine.isDeleted) {
            return res.status(404).json({ message: "Medicine not found" });
        }
        res.json(medicine);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update medicine
const updateMedicine = async (req, res) => {
    try {
        const { error } = pharmacyValidator.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const medicine = await Pharmacy.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!medicine || medicine.isDeleted) {
            return res.status(404).json({ message: "Medicine not found" });
        }
        res.json(medicine);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete medicine (soft delete)
const deleteMedicine = async (req, res) => {
    try {
        const medicine = await Pharmacy.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
        if (!medicine) return res.status(404).json({ message: "Medicine not found" });

        res.json({ message: "Medicine deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addMedicine,
    getMedicines,
    getMedicineById,
    updateMedicine,
    deleteMedicine
};
