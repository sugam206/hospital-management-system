const express = require("express");
const router = express.Router()
const { auth } = require("../middleware/auth");
const { checkRole } = require("../middleware/rbac");
router.get("/reports", auth, checkRole("DOCTOR"), (req, res) => {
    res.json({ message: "doctor report visible" });
});
const {
    createDoctor,
    getDoctor,
    getDoctorById,
    updateDoctor,
    deleteDoctor
} = require("../controller/doctor.controller");

// Create doctor (Admin only)
router.post("/", auth, checkRole("admin"), createDoctor);

// Get all doctors (Admin, Receptionist)
router.get("/", auth, checkRole("admin", "receptionist"), getDoctor);

// Get doctor by ID
router.get("/:id", auth, checkRole("admin", "receptionist"), getDoctorById);

// Update doctor (Admin only)
router.put("/:id", auth, checkRole("admin"), updateDoctor);

// Delete doctor (Admin only, soft delete)
router.delete("/:id", auth, checkRole("admin"), deleteDoctor);
module.exports = router;