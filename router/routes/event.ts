import express from 'express'
import { verifyToken }  from '../../middleware/Authentication' 

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/', verifyToken, (req, res) => {

})

module.exports = app;

//call new_event(description, type, start, end, admin_id, user_id)