import express from 'express'
import bcrypt from 'bcrypt'
import Database from '../../clients/database'
import User from '../../DTO/User'
import UserRepository from '../../repository/UserRepository'

const app = express()

const roles = ['ADMIN', 'USER', 'MEDIC'];

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/', (req, res) =>{

    let email = req.body.email
    let role = req.body.role
    let hasRole = roles.includes(role)
   
    if(!email || !req.body.firstName || !req.body.lastName || !req.body.birthdate || !req.body.password || !hasRole){
        res.status(400).json({
            error: "You must provide all the params."
        });
    }else{
        //Encripted password
    let password = bcrypt.hashSync(req.body.password,10)

    let user : User = new User(null,email,password,req.body.firstName,req.body.lastName, req.body.birthdate, role)
    //Database.getInstance().query(`INSERT INTO user (email,pass,role) VALUES ("${email}","${password}","${role}")`)
    UserRepository.insertUser(user)
    .then(results => {
        console.log(results)

        res.status(200).json({
            status : 'OK',
            email: user.getEmail(),
            firstName : user.getFirstName(),
            lastName : user.getLastName(),
            birthdate : user.getBirthdate(),
            role: user.getRole()
        })

    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            error: "There was an error while creating the user"        
        })
    });
    }
})

app.get('/', (req, res) =>{

    let email = req.body.email
    if(!email){
        res.status(400).json({
            error: "You must provide a email."
        });
    }

    //Now you must check on the SQL that the email exists, if it exists, return the entire register
    let password = req.body.password

    console.log(email,password);
})

module.exports = app;