const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASS,
    },
});
const sendEmail = async (to, subject, text) => {
    try {
        await transport.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        })
    } catch (err) {
        console.log("Email error:", err.message);
    }
};
module.exports = { sendEmail };