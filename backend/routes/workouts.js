const express = require('express')
const { 
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}= require('../controllers/workoutController')

//Creating a express router
const router = express.Router()

//This is to get all workouts
router.get('/', getWorkouts) // referencing to workoutController's var


//GET a single workout
router.get('/:id', getWorkout) // referencing to workoutController's var

//POST a new workout 
router.post('/', createWorkout) // referencing to workoutController's createWorkout (function)

//DELETE a workout
router.delete('/:id', deleteWorkout) // referencing to workoutController's var

//UPDATE a workout
router.patch('/:id',updateWorkout) // referencing to workoutController's var

module.exports = router