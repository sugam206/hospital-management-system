const express = require("express");
const router = express.Router()
const { auth } = require("../middleware/auth");
const { checkRole } = require("../middleware/rbac");
router.get("/reports", auth, checkRole("DOCTOR"), (req, res) => {
    res.json({ message: "doctor report visible" });
})
module.exports = router;