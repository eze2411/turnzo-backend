import express from "express";
import cors from "cors";

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

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
