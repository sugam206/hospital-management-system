const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config({ path: './config/.env' });
const port = process.env.PORT || 3000;
const mongoose = require('./config/db');
mongoose();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { errorHandler } = require("./middleware/errorHandler");

app.use("/auth", require("./routes/auth.routes"));
app.use("/admin", require("./routes/admin.routes"));
app.use("/doctor", require("./routes/doctor.routes"));
app.use("/nurse", require("./routes/nurse.routes"));
app.use("/reception", require("./routes/reception.routes"));
app.use(errorHandler);

app.get("/health", (req, res) => {
    res.json({ status: 'ok', message: 'api is working fine' })
});
app.listen(port, () => {
    console.log(`backend is working properly on : ${port}`)
});