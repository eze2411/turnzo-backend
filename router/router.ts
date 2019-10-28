import express from "express";
const app = express();

app.use('/login',require('./routes/login'));
app.use('/user',require('./routes/user'));
app.use('/event', require('./routes/event'))

module.exports = app;