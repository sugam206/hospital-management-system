const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { checkRole } = require("../middleware/rbac");
const {
    createRecord,
    getRecords,
    getRecordById,
    updateRecord,
    deleteRecord
} = require("../controller/medicalRecord.controller");

// Create record (Doctor/Admin)
router.post("/", auth, checkRole("doctor", "admin"), createRecord);

// Get all records (Doctor/Admin/Receptionist)
router.get("/", auth, checkRole("doctor", "admin", "receptionist"), getRecords);

// Get single record
router.get("/:id", auth, checkRole("doctor", "admin", "receptionist"), getRecordById);

// Update record
router.put("/:id", auth, checkRole("doctor", "admin"), updateRecord);

// Delete record (soft delete)
router.delete("/:id", auth, checkRole("admin"), deleteRecord);

module.exports = router;