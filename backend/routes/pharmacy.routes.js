const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { checkRole } = require("../middleware/rbac");
const {
    addMedicine,
    getMedicines,
    getMedicineById,
    updateMedicine,
    deleteMedicine
} = require("../controller/pharmacy.controller");

// Add new medicine (Admin/Pharmacist)
router.post("/", auth, checkRole("admin", "pharmacist"), addMedicine);

// Get all medicines
router.get("/", auth, checkRole("admin", "pharmacist", "doctor"), getMedicines);

// Get single medicine
router.get("/:id", auth, checkRole("admin", "pharmacist", "doctor"), getMedicineById);

// Update medicine
router.put("/:id", auth, checkRole("admin", "pharmacist"), updateMedicine);

// Delete medicine (Admin only)
router.delete("/:id", auth, checkRole("admin"), deleteMedicine);

module.exports = router;
