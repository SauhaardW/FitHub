const mongoose = require("mongoose")
const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    // _id: ObjectId
    name: {type:String, required:true},
    instructions: {type:String, required:true},
})

const Exercises = mongoose.model("exercises", exerciseSchema, "exercises")
const schemas = {"Exercises": Exercises}

module.exports = schemas