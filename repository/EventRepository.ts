import Database from '../clients/database'
import User from '../DTO/User'
import Event from '../DTO/Event'
import { resolve } from 'dns'
import { reject } from 'q'

const CALL = 'CALL'
const NEW_EVENT_PROCEDURE = 'new_event'
const ALL_EVENTS_PROCEDURE = 'get_all_events'


export default class EventRepository {

    public static async insert(user : User, event : Event){
        return new Promise( (resolve, reject) =>{
            new Database().query(`${CALL} ${NEW_EVENT_PROCEDURE}("${event.getDescription()}","${event.getType()}","${event.getStart()}","${event.getEnd()}","${event.getAdminId}","${event.getUserId()}")`)
            .then(result => {
                console.log(result)
                resolve()
            })
            .catch(err => reject(err))
        })
    }

    public static async getAll(){
        return new Promise( (resolve, reject) => {
            new Database().query(`${CALL} ${ALL_EVENTS_PROCEDURE}()`)
            .then(results => {
                console.log(results)
                resolve(results)
            })
            .catch(err => reject(err))
        })
    }

}