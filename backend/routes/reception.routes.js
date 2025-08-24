const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { checkRole } = require("../middleware/rbac");

router.get("/appointment", auth, checkRole("RECEPTION"), (req, res) => {
    res.json({ message: "reception appointment visible" });
});
module.exports = router;