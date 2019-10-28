import Database from '../clients/database'
import User from '../DTO/User'
import Event from '../DTO/Event'

const CALL = 'CALL'
const PROCEDURE = 'new_event'


export default class EventRepository {

    public static async insert(user : User, event : Event){
        return new Promise( (resolve, reject) =>{
            new Database().query(`${CALL} ${PROCEDURE}("${event.getDescription()}","${event.getType()}","${event.getStart()}","${event.getEnd()}","${event.getAdminId}","${event.getUserId()}")`)
            .then(result => {
                console.log(result)
                resolve()
            })
            .catch(err => reject(err))
        })
    }

}