import express from 'express'
const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/', (req, res) =>{

    let email = req.body.email
    if(!email){
        res.status(400).json({
            error: "You must provide a email."
        });
    }

    //Now you must check on the SQL that the email exists, if it exists, return the entire register
    let password = req.body.password
})

module.exports = app;