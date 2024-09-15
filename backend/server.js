require('dotenv').config()
const express = require('express')
const mongoose= require('mongoose')
const workoutRoutes=require('./routes/workouts')

//express app
const app = express()

//middleware
app.use(express.json()) //parses incoming request bodies that are in JSON format and makes them available as req.body in your route handlers.


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
// This grabs and attaches all the routes from workouts.js and uses in the app. And when wwe go to this: '/api/workouts' then workoutRoutes's routes gets fired and to end of it
app.use('/api/workouts', workoutRoutes) 

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests after connecting to database
        app.listen(process.env.PORT, ()=>{
            console.log("Connected to db & listening in port",process.env.PORT);
        })
    })
    .catch((error) =>{
        console.log(error)
    })





