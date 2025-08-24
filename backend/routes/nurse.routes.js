const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { checkRole } = require("../middleware/rbac");

router.get("/vitals", auth, checkRole("NURSE"), (req, res) => {
    res.json({ message: "nurse vitals visible" });
});
module.exports = router;