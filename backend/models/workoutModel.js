 const mongoose = require('mongoose')

 const Schema= mongoose.Schema


 const workoutSchema = new Schema({
    title: {
        type: String,
        required : true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
 }, {timestamps: true})  // adds createdc at and updated at properties 

 module.exports=mongoose.model('Workout',workoutSchema)  // this ceates and exports the model