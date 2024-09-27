const Workout= require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req,res) => {
    const user_id = req.user._id

    const workouts = await Workout.find({user_id}).sort({createdAt: -1})    // to display newest one in top

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

    let emptyFields = []

        if (!title) {
            emptyFields.push('title')
        }
        if (!load) {
            emptyFields.push('load')
        }
        if (!reps) {
            emptyFields.push('reps')
        }
        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
        }

// add doc to db
    try {
        const user_id = req.user._id
        const workout = await Workout.create({title, load, reps, user_id})  // this is async.  uses the Workout.create() method  to create and save a new workout document in the MongoDB database with the provided title, load, and reps fields.
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