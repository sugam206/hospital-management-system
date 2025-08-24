const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../modules/users/user.model');
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

exports.signup = async (req, res) => {
    try {

        const { username, password, email, role } = req.body;
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: "user already exist" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            username,
            password: hashPassword,
            email,
            role: role || "PATIENTS",
        });
        res.status(201).json({ message: "user created sucessfully", user: newUser })
    } catch (error) {
        res.status(500).json({ message: "error while creating user", error: error.message });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const exist = await User.findOne({ email });
        if (!exist) {
            return res.status(404).json({ message: "user not found" })
        }
        const validPassword = await bcrypt.compare(password, exist.password);
        if (!validPassword) {
            return res.status(400).json({ message: "invalid password" });
        }
        const token = jwt.sign({ id: exist._id, role: exist.role }, JWT_SECRET, { expiresIn: "1d" });

        res.json({ message: "login successfully", token });
    } catch (error) {
        res.json({ message: "errorlogin", error: error.message })
    }
};