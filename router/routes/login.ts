import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserRepository from '../../repository/UserRepository'

const app = express()
const SEED = 'TEST_SEED';

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/', (req, res) =>{

    let email = req.body.email
    if(!email){
        res.status(400).json({
            error: "You must provide a email."
        });
    }

    //Now you must check on the SQL that the email exists, if it exists, return the entire register
    let password = req.body.password
    if(!password){
        res.status(400).json({
            error: "You must provide a password."
        });
    }
    UserRepository.findByEmail(email)
    .then(result => {

        if ( !bcrypt.compareSync(password, result.getPassword()!) ){
            return res.status(400).json({
              ok: false,
              err: {
              message: 'Usuario o (Contraseña) inconrrecta'
              }
            })
          }
      
          let token = jwt.sign({
            user : result
          }, SEED, {expiresIn: '48h' })
      
          res.json({
            ok: true,
            user: {
                email : email,
                role : result.getRole()
            },
            token
          })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: "There was an error while login the user"        
        })
    })
})

module.exports = app;