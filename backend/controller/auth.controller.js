const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('./modules./users/user');
const jwt_secret = process.env.JWT_SECRET || "supersecret";

exports.signup = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;
        const exist = await user.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: "user already exist" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await user.create({
            username,
            password: hashPassword,
            email,
            role,
        });
        res.status(201).json({ message: "user created sucessfully", user })
    } catch (error) {
        res.status(500).json({ message: "error while creating user", error: error.message });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const exist = await user.findOne({ email });
        if (!exist) {
            return res.status(404).json({ message: "user not found" })
        }
        const validPassword = await bcrypt.compare(Password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "invalid password" });
        }
        const token = token.sign({
            id: user._id, role: user.role
        }, JWT_SECRET,
            { expireIn: "1d" });
        res.json({ message: "login successfully", token });
    } catch (error) {
        res.json({ message: "errorlogin", error: error.message })
    }
};