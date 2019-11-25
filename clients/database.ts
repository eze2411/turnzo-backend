import mysql from 'mysql'
import { disconnect } from 'cluster'

export default class Database {
    private connection : mysql.Connection

    private static HOST : string = 'turnzo-dev.cumg0vjkzfqu.us-east-2.rds.amazonaws.com'
    private static USER : string = 'espertmilei'
    private static PASSWORD : string = '46bi]MhHUM.^0Uyn'
    private static DATABASE : string = 'turnzo'
    
    public constructor(){
        this.connection = mysql.createConnection({
            host     : Database.HOST,
            user     : Database.USER,
            password : Database.PASSWORD,
            database : Database.DATABASE,
            connectTimeout : 100000
        });
    }

    async query(query : string) {
        return new Promise( (resolve, reject) =>{
            this.connection.query(query, function (error, results, fields) {

                if (error) 
                    reject(error);

                resolve(results)
                disconnect(); 
            })
        })
    }

    async connect(){
        return new Promise( (resolve,reject) =>{
            this.connection.connect((err)=>{
                if(err) {
                    reject(err)
                }
                resolve();
            })
        })
    }

    async disconnect(){
        return new Promise( (resolve,reject) =>{
            this.connection.end((err)=>{
                if(err) {
                    reject(err)
                    console.log(err)
                }
                console.log("The connection to database has been closed")
                resolve();
            })
        })
    }
}