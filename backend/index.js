const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config({ path: './config/.env' });
const port = process.env.PORT || 3000;
const mongoose = require('./config/db');
mongoose();


app.get("/", (req, res) => {
    res.send('welcome to hospital management system')
})
app.get("/health", (req, res) => {
    res.json({ status: 'ok', message: 'api is working fine' })
});
app.listen(port, () => {
    console.log(`backend is working properly on : ${port}`)
});