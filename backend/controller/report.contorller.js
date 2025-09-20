const Report = require("../modules/report.model");
const reportValidation = require("../validation/reportValidation");

const createReport = async (req, res) => {
    try {
        const { error } = reportValidation.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const newReport = new Report({ ...req.body, createdBy: req.user._id });
        const savedReport = await newReport.save();

        res.status(201).json(savedReport);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getReports = async (req, res) => {
    try {
        const reports = await Report.find({ isDeleted: false })
            .populate("patientId", "name mrn")
            .populate("doctorId", "name role");
        res.json(reports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id)
            .populate("patientId", "name mrn")
            .populate("doctorId", "name role");
        if (!report || report.isDeleted) return res.status(404).json({ message: "Report not found" });

        res.json(report);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteReport = async (req, res) => {
    try {
        const deletedReport = await Report.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        );
        if (!deletedReport) return res.status(404).json({ message: "Report not found" });

        res.json({ message: "Report deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createReport, getReports, getReportById, deleteReport };
