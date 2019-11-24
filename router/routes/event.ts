import express from 'express'
import { verifyToken, verifyAdminRole }  from '../../middleware/Authentication' 
import EventRepository from './../../repository/EventRepository'
import Event from '../../DTO/Event'

const roles = ['ADMIN', 'USER'];

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

app.post('/update', [verifyToken], (req :express.Request, res :express.Response) => {
    let description = req.body.description
    let start = req.body.start
    let end = req.body.end
    let id = req.body.id

    if (!id || !description || !start || !end) {
        res.status(400).json({
            message : "You must provide all the params."
        })
    }

    let event : Event = new Event(id,description,null,null,null,start,end);
    EventRepository.updateEvent(event)
    .then(()=> {
        res.status(200).json({
            message : "Event was succesfully updated."
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message : 'There was an error while trying to update the event'
        })
    })
})

app.post('/delete', [verifyToken], (req :express.Request, res :express.Response) => {
    let id = req.body.id
    let user = res.locals.user

    if (!id) {
        res.status(400).json({
            message : "You must provide all the params."
        })
    }

    EventRepository.findById(id)
    .then((response) => {
        let authorized = false
        let event = JSON.parse(JSON.stringify(response))
       if (user.role == roles[0]){
           authorized = event.admin_id === user.id
       }
       if (user.role == roles[1]){
           authorized = event.user_id === user.id
       }
       if(!authorized){
        res.status(401).json({
            message : 'You are not authorized to delete the provided event'
        })
       }else{
            EventRepository.deleteEvent(id)
            .then(() =>{
                res.status(200).json({
                    message : "Event successfully deleted"
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    message : 'There was an error while trying to get events'
                })
            })
       }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message : 'There was an error while trying to get events'
        })
    })
})

app.get('/admin', verifyToken, (req :express.Request, res :express.Response) => {
    console.log(res.locals.user)

    if(res.locals.user.role == 'ADMIN'){
        EventRepository.getAdminEvents(res.locals.user.email)
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
    }
})

app.get('/user/:admin', verifyToken, (req :express.Request, res :express.Response) => {
    let admin = req.params.admin;
    console.log(res.locals.user);
    if(res.locals.user.role == 'USER'){
        console.log("ASDASD");
        console.log(admin);
        EventRepository.getUserEvents(admin, res.locals.user.email)
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
    }
})

module.exports = app;