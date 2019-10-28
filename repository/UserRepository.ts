import Database from '../clients/database'
import User from '../DTO/User'

const SELECT = 'SELECT'
const EVERYTHING = '*'
const FROM = 'FROM'
const DATABASE = "user"
const WHERE = 'WHERE'
const CALL = 'CALL'

const PROCEDURE = 'new_user'

export default class UserRepository {

    public static async findByEmail(email : string) : Promise<User>{
        return new Promise( (resolve, reject) =>{
            Database.getInstance().query(`${SELECT} ${EVERYTHING} ${FROM} ${DATABASE} ${WHERE} ${DATABASE}.email = "${email}"`)
            .then(result =>{
                let response = JSON.parse(JSON.stringify(result))[0];
                console.log(response)
                let user = new User(response.id, response.email, response.pass, null, null,null,response.role)
                resolve(user)    
            }).catch(err => reject(err))
        })
    }

    public static async insertUser(user : User){
        return new Promise( (resolve, reject) =>{
            Database.getInstance().query(`${CALL} ${PROCEDURE}("${user.getEmail()}","${user.getPassword()}","${user.getFirstName()}","${user.getLastName()}","${user.getBirthdate()}","${user.getRole()}")`)
            .then((results)=> {
                console.log(results)
                resolve()
            })
            .catch(err => reject(err))
        }) 
    }

}