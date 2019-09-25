import mysql from 'mysql'
import { reject } from 'q'
import { resolve } from 'dns'
import { response } from 'express'

export default class Database {
    private static _instance : Database

    private connection : mysql.Connection

    private static HOST : string = 'turnzo-dev.cumg0vjkzfqu.us-east-2.rds.amazonaws.com'
    private static USER : string = 'espertmilei'
    private static PASSWORD : string = '46bi]MhHUM.^0Uyn'
    private static DATABASE : string = 'turnzo'
    
    private constructor(){
        this.connection = mysql.createConnection({
            host     : Database.HOST,
            user     : Database.USER,
            password : Database.PASSWORD,
            database : Database.DATABASE,
            connectTimeout : 100000
        });
    }

    static getInstance(){
        if(!this._instance){
            this._instance = new Database()
        }
        return this._instance
    }

    async query(query : string) {
        this.connection.connect((err)=>{
            console.log(err)
        })



        return new Promise( (reject, resolve) =>{
            this.connection.query(query, function (error, results, fields) {

                if (error) 
                    reject(error);

                console.log(results);
                resolve(results) 
            })
            this.connection.end();
        })

       /* this.connection.query(query, function (error, results, fields) {

            if (error) 
                callback(error, null);

            console.log(results);
            callback(null,results) 
        })
        this.connection.end();
        
        , callback : (err : any, response : any) => void*/
    }
}

/*return new Promise( (reject, resolve) =>{
            this.connection.query(query, function (error, results, fields) {

                if (error) 
                    reject(error);

                console.log(results);
                resolve(results) 
            })
            this.connection.end();
        })*/