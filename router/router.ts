import express from "express";
const app = express();

app.use('/login',require('./routes/login'));

module.exports = app;