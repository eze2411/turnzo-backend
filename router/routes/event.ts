import express from 'express'
import { verifyToken }  from '../../middleware/Authentication' 
import EventRepository from './../../repository/EventRepository'

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/', verifyToken, (req, res) => {

})

module.exports = app;

app.get('/all', verifyToken, (req, res) => {
    EventRepository.getAll()
    .then( results => {
        res.status(200).json({
            events : results
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message : 'There was an error while trying to get events'
        })
    })
})

//call new_event(description, type, start, end, admin_id, user_id)