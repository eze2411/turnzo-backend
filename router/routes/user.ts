import express from 'express'
import bcrypt from 'bcrypt'
import User from '../../DTO/User'
import UserRepository from '../../repository/UserRepository'
import { verifyToken }  from '../../middleware/Authentication' 

const app = express();

const roles = ['ADMIN', 'USER', 'MEDIC'];

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/', (req, res) =>{

    let email = req.body.email;
    let role = req.body.role;
    let hasRole = roles.includes(role);
   
    if(!email || !req.body.firstName || !req.body.lastName || !req.body.birthdate || !req.body.password || !hasRole){
        res.status(400).json({
            error: "You must provide all the params."
        });
    }else{
        //Encripted password
    let password = bcrypt.hashSync(req.body.password,10);

    let user : User = new User(null,email,password,req.body.firstName,req.body.lastName, req.body.birthdate, role)
    UserRepository.insertUser(user)
    .then(() => {

        res.status(200).json({
            status : 'OK',
            email: user.getEmail(),
            firstname : user.getFirstName(),
            lastname : user.getLastName(),
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
});

app.get('/', [verifyToken], (req :express.Request, res :express.Response) =>{
    UserRepository.findByEmail(res.locals.user.email)
        .then(result=>{
            res.status(200).json({
                status : 'OK',
                user : {
                    'id': result.getId(),
                    'email': result.getEmail(),
                    'firstname': result.getFirstName(),
                    'lastname': result.getLastName(),
                    'birthdate': result.getBirthdate(),
                    'role': result.getRole()
                }
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "There was an error while creating the user"
            })
        });
});

app.put('/', [verifyToken], (req :express.Request, res :express.Response) =>{
    let user = res.locals.user;
    let body = req.body
    if (!body.firstname || !body.lastname || !body.birthdate){
        res.status(400).json({
            error: "You must provide all the params."
        });
    }else{
        let updatedUser = new User(user.id,user.email,user.password,body.firstname, body.lastname, body.birthdate, user.role)
        UserRepository.updateUser(updatedUser)
        .then(()=>{
            res.status(200).json({
                status : 'OK',
                message : 'User updated successfully'
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "There was an error while creating the user"        
            }) 
        })
    }
});

app.get('/all', [verifyToken], (req :express.Request, res :express.Response) =>{
    UserRepository.getUsers()
    .then((results) =>{
        res.status(200).json({
            results : results
        })
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({
            error: "There was an error while creating the user"        
        }) 
    })
});

module.exports = app;