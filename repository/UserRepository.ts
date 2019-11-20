import Database from '../clients/database'
import User from '../DTO/User'
import { reject } from 'q'

const CALL = 'CALL'

const NEW_USER_PROCEDURE = 'new_user'
const FIND_USER_PROCEDURE = 'find_user'
const UPDATE_USER_PROCEDURE = 'update_user'

export default class UserRepository {

    public static async findByEmail(email : string) : Promise<User>{
        return new Promise( (resolve, reject) =>{
            new Database().query(`${CALL} ${FIND_USER_PROCEDURE}("${email}")`)
            .then(result =>{
                try{
                    let response = JSON.parse(JSON.stringify(result))[0][0]
                    let user = new User(response.id, response.email, response.password, response.firstname, response.lastname, response.birthdate, response.role)
                    console.log(user)
                    resolve(user)
                       
                }catch(err){reject(err)}
            }).catch(err => reject(err))
        })
    }

    public static async insertUser(user : User){
        return new Promise( (resolve, reject) =>{
            new Database().query(`${CALL} ${NEW_USER_PROCEDURE}("${user.getEmail()}","${user.getPassword()}","${user.getFirstName()}","${user.getLastName()}","${user.getBirthdate()}","${user.getRole()}")`)
            .then((results)=> {
                console.log(results)
                resolve()
            })
            .catch(err => reject(err))
        }) 
    }

    public static async updateUser(user : User){
        return new Promise((resolve, reject) => {
            new Database().query(`${CALL} ${UPDATE_USER_PROCEDURE}("${user.getEmail()}","${user.getFirstName()}","${user.getLastName()}","${user.getBirthdate()}")`)
            .then((result) => {
                console.log(result)
                resolve()
            })
            .catch(err => reject(err))
        })
    }

}

//call find_user(email)