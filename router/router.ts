import express from "express";
const app = express();

app.use('/login',require('./routes/login'));
app.use('/user',require('./routes/user'));

module.exports = app;