const express = require("express");
const router = express.Router();
const { Users } = require("../modules/users/user.model")
const { auth } = require("../middleware/auth");
const { checkRole } = require("../middleware/rbac");

router.get("/users", auth, checkRole("ADMIN"), async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }

});
router.delete("/users/:id", auth, checkRole("ADMIN"), async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
});
module.exports = router;