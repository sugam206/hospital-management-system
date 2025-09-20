const express = require("express");
const { auth } = require("../middleware/auth");
const { checkRole } = require("../middleware/rbac");
const {
    createStaff,
    getStaff,
    getStaffById,
    updateStaff,
    deleteStaff,
} = require("../controller/staff.controller");

const router = express.Router();

// Only admin can create/update staff
router.post("/", auth, checkRole("admin"), createStaff);
router.get("/", auth, checkRole("admin"), getStaff);
router.get("/:id", auth, checkRole("admin"), getStaffById);
router.put("/:id", auth, checkRole("admin"), updateStaff);
router.delete("/:id", auth, checkRole("admin"), deleteStaff);

module.exports = router;
