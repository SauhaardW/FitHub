const express = require("express");
const router = express.Router();
const Exercise = require(".../models/exerciseModel");

router.route("").post((req, res) => {
    const exercise = req.body.exercise;
    const instructions = req.body.instructions;
    const newExercise = new Exercise({
        exercise,
        instructions
    })

    newExercise.save();

})

module.exports = "http://localhost:3000";
