import Database from '../clients/database'
import User from '../DTO/User'

const CALL = 'CALL'

const NEW_USER_PROCEDURE = 'new_user'
const FIND_USER_PROCEDURE = 'find_user'
const UPDATE_USER_PROCEDURE = 'update_user'
const GET_ALL_USERS = 'get_users'
const GET_ALL_ADMINS = 'get_admins'

export default class UserRepository {

    public static async findByEmail(email : string) : Promise<User>{
        return new Promise( (resolve, reject) =>{
            const databaseConnection = new Database()
            databaseConnection.query(`${CALL} ${FIND_USER_PROCEDURE}("${email}")`)
            .then(result =>{
                try{
                    let response = JSON.parse(JSON.stringify(result))[0][0]
                    let user = new User(response.id, response.email, response.password, response.firstname, response.lastname, response.birthdate, response.role)
                    console.log(user)
                    resolve(user)
                       
                }catch(err){reject(err)}
            }).catch(err => reject(err))

            databaseConnection.disconnect()
        })
    }

    public static async insertUser(user : User){
        return new Promise( (resolve, reject) =>{
            const databaseConnection = new Database()
            databaseConnection.query(`${CALL} ${NEW_USER_PROCEDURE}("${user.getEmail()}","${user.getPassword()}","${user.getFirstName()}","${user.getLastName()}","${user.getBirthdate()}","${user.getRole()}")`)
            .then((results)=> {
                console.log(results)
                resolve()
            })
            .catch(err => reject(err))

            databaseConnection.disconnect()
        }) 
    }

    public static async updateUser(user : User){
        return new Promise((resolve, reject) => {
            const databaseConnection = new Database()
            databaseConnection.query(`${CALL} ${UPDATE_USER_PROCEDURE}("${user.getEmail()}","${user.getFirstName()}","${user.getLastName()}","${user.getBirthdate()}")`)
            .then((result) => {
                console.log(result)
                resolve()
            })
            .catch(err => reject(err))

            databaseConnection.disconnect()
        })
    }

    public static async getUsers(){
        return new Promise((resolve, reject) => {
            const databaseConnection = new Database()
            databaseConnection.query(`${CALL} ${GET_ALL_USERS}()`)
            .then((results) => {
                let response = JSON.parse(JSON.stringify(results))[0]
                console.log(response);
                resolve(response)
            })
            .catch(err => reject(err))

            databaseConnection.disconnect()
        })
    }

    public static async getAdmins(){
        return new Promise((resolve, reject) => {
            const databaseConnection = new Database()
            databaseConnection.query(`${CALL} ${GET_ALL_ADMINS}()`)
            .then((results) => {
                let response = JSON.parse(JSON.stringify(results))[0]
                console.log(response);
                resolve(response)
            })
            .catch(err => reject(err))

            databaseConnection.disconnect()
        })
    }

}