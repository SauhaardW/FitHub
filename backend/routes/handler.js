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

module.exports = router