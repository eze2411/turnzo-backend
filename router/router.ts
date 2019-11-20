import express from "express"
const app = express()

app.use('/login', require('./routes/login'))
app.use('/event', require('./routes/event'))
app.use('/admin', require('./routes/admin'))
app.use('/user', require('./routes/user'))

module.exports = app