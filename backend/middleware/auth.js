import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

exports.auth = (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) {
        return res.status(401).json({ message: "token not provided" });
    };
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "invalid token" });

    };
    try {
        const decode = jwt.verify(token, JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        res.status(404).json({ message: "unauthorized" });
    }

};