import express from 'express'
import { verifyToken, verifyAdminRole }  from '../../middleware/Authentication' 
import EventRepository from './../../repository/EventRepository'
import Event from '../../DTO/Event'

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/lock', [verifyToken, verifyAdminRole], (req :express.Request, res :express.Response) => {
    let start = req.body.start
    let end = req.body.end

    if(!start || !end){
        res.status(400).json({
            message : "You must provide all the params."
        })
    }

    let user = res.locals.user;
    console.log(user)

    EventRepository.insertLock(start,end,user.email!)
    .then(() => {
        res.status(200).json({
            message : "Lock was succesfully insert."
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message : 'There was an error while trying to get events'
        })
    })
})

app.post('/turnzo', verifyToken, (req :express.Request, res :express.Response) =>{

    let description = req.body.description
    let start = req.body.start
    let end = req.body.end
    let destiny = req.body.destiny

    if (!description || !start || !end || !destiny){
        res.status(400).json({
            message : "You must provide all the params."
        })
    }
    let user = res.locals.user
    let event = new Event(null,description,"TURNZO",user.email,destiny,start,end)

    EventRepository.insert(event)
    .then(() => {
        res.status(200).json({
            message : "Event was succesfully insert."
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message : 'There was an error while trying to get events'
        })
    })
})

app.get('/all', verifyToken, (req :express.Request, res :express.Response) => {
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

module.exports = app;