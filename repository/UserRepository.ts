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

    public static async findByEmail(email : string){
        return Database.getInstance().query(`${SELECT} ${EVERYTHING} ${FROM} ${DATABASE} ${WHERE} ${DATABASE}.email = "${email}"`)
    }

    public static async insertUser(user : User){
        return Database.getInstance().query(`${CALL} ${PROCEDURE}("${user.getEmail()}","${user.getPassword()}","${user.getFirstName()}","${user.getLastName()}","${user.getBirthdate()}","${user.getRole()}")`)
    }

}