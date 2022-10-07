const express = require("express")
const router = express.Router()
const Schemas = require("../models/schemas")

router.post("/api/exercise", async (req, res) => {
    const newExercise = new Schemas.Exercises(req.body)

    try {
        await newExercise.save( async(err, result) => {
            if (err) {
                res.statusCode = 500
                res.end("Error while adding new exercise:" + err);
            } else {
                res.end("Successfully added to database" + result);
            }
        })
    } catch (err) {
        res.statusCode = 500
        console.log(err);
        res.end();
    }
});

router.get("/api/exercises", async (req, res) => {
    const exercises = Schemas.Exercises

    try {
        var allExercises = await exercises.find( {} );
        res.data = allExercises;
        res.send(allExercises);
    } catch (err) {
        res.statusCode = 500
        console.log(err);
        res.send();
    }
});

module.exports = router