const Workout= require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req,res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1}) // to display newest one in top

    res.status(200).json(workouts)
}


//get a single workout
const getWorkout = async(req,res) => {
    const { id } = req.params  //grabbing the id property from route parameters

    if(!mongoose.Types.ObjectId.isValid(id)){ // if not valid obj id form db 
        return res.status(404).json({error: 'No such workouts'})
    }

    const workout = await Workout.findById(id)  // if this doc is not found, the var will be null

    if(!workout){  // if null, fire 404 status 
        return res.status(404).json({error : 'No such workout'})
    }

    res.status(200).json(workout)
}


//create new workout
const createWorkout = async (req,res) =>{
    const {title, load, reps} = req.body  //destructures title, load, and reps from req.body, which means it's expecting the client to send these values in the request body (typically in JSON format) when creating a workout.

// add doc to db
    try {
        const workout = await Workout.create({title, load, reps})  // this is async.  uses the Workout.create() method  to create and save a new workout document in the MongoDB database with the provided title, load, and reps fields.
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
//delete a workout
const deleteWorkout = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){ // if not valid obj id form db 
        return res.status(404).json({error: 'No such workouts'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})  //_id is parameter name 

    if(!workout){  // if null, fire 404 status 
        return res.status(400).json({error : 'No such workout'})
    }

    res.status(200).json(workout)

}

//update a workout

const updateWorkout = async (req, res ) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){ // if not valid obj id form db 
        return res.status(404).json({error: 'No such workouts'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout){  // if null, fire 404 status 
        return res.status(400).json({error : 'No such workout'})
    }

    res.status(200).json(workout)
}



module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}