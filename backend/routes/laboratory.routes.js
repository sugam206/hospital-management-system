const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { checkrole } = require("../middleware/rbac");
const {
    createLabRequest,
    getLabRequests,
    getLabRequestById,
    updateLabRequest,
    deleteLabRequest
} = require("../controller/laboratory.controller");

// Create lab request (Doctor/Admin)
router.post("/", auth, checkrole("doctor", "admin"), createLabRequest);

// Get all lab requests (Doctor/Admin/Lab Technician)
router.get("/", auth, checkrole("doctor", "admin", "labtech"), getLabRequests);

// Get single lab request
router.get("/:id", auth, checkrole("doctor", "admin", "labtech"), getLabRequestById);

// Update lab request (Lab Technician/Admin)
router.put("/:id", auth, checkrole("labtech", "admin"), updateLabRequest);

// Delete lab request (Admin only)
router.delete("/:id", auth, checkrole("admin"), deleteLabRequest);

module.exports = router;
