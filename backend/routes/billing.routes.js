const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { checkrole } = require("../middleware/rbac");
const {
    createBill,
    getBills,
    getBillById,
    updateBill,
    deleteBill
} = require("../controller/biling.controller");

// Create bill (Admin/Receptionist)
router.post("/", auth, checkrole("admin", "receptionist"), createBill);

// Get all bills
router.get("/", auth, checkrole("admin", "receptionist"), getBills);

// Get single bill
router.get("/:id", auth, checkrole("admin", "receptionist"), getBillById);

// Update bill
router.put("/:id", auth, checkrole("admin", "receptionist"), updateBill);

// Delete bill
router.delete("/:id", auth, checkrole("admin"), deleteBill);

module.exports = router;
