import Database from '../clients/database'
import Event from '../DTO/Event'

const CALL = 'CALL'
const NEW_EVENT_PROCEDURE = 'new_event'
const ALL_EVENTS_PROCEDURE = 'get_all_events'
const NEW_LOCK_PROCEDURE = 'new_lock'
const UPDATE_EVENT_PROCEDURE = 'update_event'
const DELETE_EVENT_PROCEDURE = 'delete_event'
const FIND_BY_ID = 'find_event'


export default class EventRepository {

    public static async insert(event : Event){
        return new Promise( (resolve, reject) =>{
            new Database().query(`${CALL} ${NEW_EVENT_PROCEDURE}("${event.getDescription()}","${event.getStart()}","${event.getEnd()}","${event.getOrigin()}","${event.getDestiny()}")`)
            .then(result => {
                console.log(result)
                resolve()
            })
            .catch(err => reject(err))
        })
    }

    public static async findById(id: number){
        return new Promise( (resolve, reject) =>{
            new Database().query(`${CALL} ${FIND_BY_ID}("${id}")`)
            .then(result => {
                let response = JSON.parse(JSON.stringify(result))[0][0]
                console.log(response)
                resolve(response)
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

    public static async insertLock(start :Date, end : Date, admin : string){
        return new Promise( (resolve, reject) =>{
            new Database().query(`${CALL} ${NEW_LOCK_PROCEDURE}("${start}","${end}","${admin}")`)
            .then(result => {
                console.log(result)
                resolve()
            })
            .catch(err => reject(err))
        })
    }

    public static async updateEvent(event : Event){
        return new Promise( (resolve, reject) =>{
            new Database().query(`${CALL} ${UPDATE_EVENT_PROCEDURE}("${event.getId()}","${event.getDescription()}","${event.getStart()}","${event.getEnd()}")`)
            .then(result => {
                console.log(result)
                resolve()
            })
            .catch(err => reject(err))
        })
    }

    public static async deleteEvent(id : number){
        return new Promise( (resolve, reject) =>{
            new Database().query(`${CALL} ${DELETE_EVENT_PROCEDURE}("${id}")`)
            .then(result => {
                console.log(result)
                resolve()
            })
            .catch(err => reject(err))
        })
    }
}