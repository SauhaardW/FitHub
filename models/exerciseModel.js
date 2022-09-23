const mongoose = require("mongoose");

const exercisesSchema = {
    exercise: String,
    instructions: String
}

const Exercise = mongoose.model("Exercise", exercisesSchema);

module.exports = Exercise;