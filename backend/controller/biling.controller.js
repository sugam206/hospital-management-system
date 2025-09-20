const Billing = require("../modules/billing/billing.model");
const billingValidator = require("../validation/billingValidation");

const createBill = async (req, res) => {
    try {
        const { error } = billingValidator.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const bill = new Billing(req.body);
        await bill.save();
        res.status(201).json(bill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getBills = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const bills = await Billing.find({ isDeleted: false })
            .populate("patientId", "name phone")
            .populate("doctorId", "name specialization")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Billing.countDocuments({ isDeleted: false });

        res.json({ total, page, limit, bills });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single bill
const getBillById = async (req, res) => {
    try {
        const bill = await Billing.findById(req.params.id)
            .populate("patientId", "name phone")
            .populate("doctorId", "name specialization");

        if (!bill || bill.isDeleted) return res.status(404).json({ message: "Bill not found" });

        res.json(bill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update bill
const updateBill = async (req, res) => {
    try {
        const { error } = billingValidator.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const bill = await Billing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bill || bill.isDeleted) return res.status(404).json({ message: "Bill not found" });

        res.json(bill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete bill (soft delete)
const deleteBill = async (req, res) => {
    try {
        const bill = await Billing.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
        if (!bill) return res.status(404).json({ message: "Bill not found" });

        res.json({ message: "Bill deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createBill,
    getBills,
    getBillById,
    updateBill,
    deleteBill
};
