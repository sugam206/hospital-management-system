const express = require("express");
const router = express.Router();
const User = require("../modules/users/user.model")
const { auth } = require("../middleware/auth");
const { checkRole } = require("../middleware/rbac");


router.get("/users", auth, checkRole("ADMIN"), async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;
        //search query;
        const query = {
            $or: [
                { username: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ]
        }
        //pagination
        const users = await User.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await User.countDocuments(query);
        res.json({
            success: true,
            data: users,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit)

        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

});
router.put("/users/:id/role", auth, checkRole("ADMIN"), async (req, res) => {
    try {
        const { role } = req.body;
        const allowRoles = ["ADMIN", "DOCTOR", "NURSE", "RECEPTION", "PATIENTS"];
        if (!allowRoles.includes(role)) {
            res.status(400).json({ message: "invalid role", success: false })
        };
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        );
        if (!updatedUser) {
            res.status(500).json({ success: false, message: "user not found" })
        };
        res.json({
            success: true,
            message: "user updated succesfully",
            data: updatedUser
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete("/users/:id", auth, checkRole("ADMIN"), async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if (!deleteUser) {
            res.json({ message: "user not found", success: false })
        }
        res.json({
            success: true,
            message: "user deleted successfully"
        })
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
});
module.exports = router;