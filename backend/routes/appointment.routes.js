const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { checkRole } = require("../middleware/rbac");
const {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
} = require("../controller/appointment.controller");

// Create appointment (Receptionist/Admin)
router.post("/", auth, checkRole("admin", "receptionist"), createAppointment);

// Get all appointments (Admin/Receptionist/Doctor)
router.get("/", auth, checkRole("admin", "receptionist", "doctor"), getAppointments);

// Get single appointment
router.get("/:id", auth, checkRole("admin", "receptionist", "doctor"), getAppointmentById);

// Update appointment
router.put("/:id", auth, checkRole("admin", "receptionist"), updateAppointment);

// Delete appointment (soft delete)
router.delete("/:id", auth, checkRole("admin"), deleteAppointment);

module.exports = router;