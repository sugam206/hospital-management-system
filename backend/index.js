const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config({ path: './config/.env' });
const port = process.env.PORT || 3000;
const mongoose = require('./config/db');
mongoose();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { errorHandler } = require("./middleware/errorHandler");

app.use("/auth", require("./routes/auth.routes"));
app.use("/admin", require("./routes/admin.routes"));
app.use("/doctor", require("./routes/doctor.routes"));
app.use("/nurse", require("./routes/nurse.routes"));
app.use("/reception", require("./routes/reception.routes"));
app.use("/api/patients", require("./routes/patients.routes"));
app.use("/api/staff", require("./routes/staff.routes"));
app.use("/api/report", require("./routes/report.routes"));
app.use(errorHandler);
app.get("/", (req, res) => {
    res.json({ status: "okay", message: "it`s working " })
});

app.get("/api", (req, res) => {
    res.json({ status: 'ok', message: 'api is working fine' })
});
app.listen(port, () => {
    console.log(`backend is working properly on : ${port}`)
});