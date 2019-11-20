import express from 'express'
import UserRepository from '../../repository/UserRepository'
import { verifyToken }  from '../../middleware/Authentication' 

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/all', [verifyToken], (req :express.Request, res :express.Response) => {
    UserRepository.getAdmins()
    .then((results) => {
        res.status(200).json({
            results : results
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: "There was an error while creating the user"        
        })
    })
})

module.exports = app