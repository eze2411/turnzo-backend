import express from "express";
import cors from "cors";
import Database from './clients/database'

const app = express();
const port = 3000; // default port to listen

// Change this URL before going live PROD
app.use(cors({origin: 'http://localhost:4200'}));

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    // render the index template
    res.status(200).json({
        message : "Hello World!"
    })
} );

console.log(Database.getInstance().query('SELECT * from user;').catch(err => console.log(err)))

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
