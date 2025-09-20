const express = require("express");
const { auth } = require("../middleware/auth");
const { checkRole } = require("../middleware/rbac");
const {
    createReport,
    getReports,
    getReportById,
    deleteReport,
} = require("../controller/report.contorller");

const router = express.Router();

// Only doctors & admin can create reports
router.post("/", auth, checkRole("doctor", "admin"), createReport);

// All authenticated users can view reports
router.get("/", auth, getReports);
router.get("/:id", auth, getReportById);

// Only admin can delete reports
router.delete("/:id", auth, checkRole("admin"), deleteReport);

module.exports = router;
