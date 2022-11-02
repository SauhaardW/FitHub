const db = require("../../db")
const utils = require("../../utils")
const mongoose = require("mongoose")

const dirName = utils.getDirName(__dirname)

module.exports.logWorkout = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body.workout_history.workoutID)}`);

    var workoutData = req.body.workout_history;

    utils.verifyJWT(req, res, (req, res) => {
        const id = mongoose.Types.ObjectId(req.JWT_data.id)

        db.models.workout.findById(workoutData.workoutID, (err, data) => {
            if (err) {
                console.log(`[${dirName}] ERROR: Failed to get ${workoutData.workoutID}`);
                console.log(err);
                res.send({success: false, error: err});
            }else if (data == null){
                console.log(`[${dirName}] Workout ${workoutData.workoutID} does not exist`);
                res.send({error: `Workout ${workoutData.workoutID} does not exist`, success: false});
                return;
            }else {
                //workout with workoutID exists
                var exercise_ids = workoutData.exercises.map(exercise => mongoose.Types.ObjectId(exercise.exerciseID));

                db.models.exercise.find({ _id: { $in: exercise_ids } }, (err, exercises_data) => {
                    if (err) {
                        console.log(`[${dirName}] ERROR: An error occurred finding the exercises ${id}`);
                        console.log(err);
                        res.send({error: "Error occurred finding the exercises", success: false});
                        return;
                    }else{
                        logWorkout(id, workoutData, exercise_ids, exercises_data, req, res);
                    }
                })
            }
        });
    });
}

const logWorkout = (id, workoutData, exercise_ids, exercises_data, req, res) => {
    if (exercises_data === null || exercise_ids.length !== exercises_data.length){
        console.log(`[${dirName}] Exercises with given ids do not exist`);
        res.send({error: "Exercises with given ids do not exist", success: false});
        return;
    }

    db.models.workoutHistory.findOne({"userID": id}, (err, workout_history) => {
        if (err) {
            console.log(`[${dirName}] ERROR: An error occurred finding the workout history for ${id}`);
            console.log(err);
            res.send({error: "Error occurred finding the workout history", success: false});
            return;
        } else if (workout_history == null) {
            // user has no workout history, create new workout history instance to store their workout logs

            const workoutHistory = new db.models.workoutHistory({userID: id, workout_history: workoutData});
            workoutHistory.save((err, workout_logged) => {
                if (err) {
                    console.log(`[${dirName}] ERROR: Failed to save logged workout for ${id}`);
                    console.log(err);
                    res.send({error: "Error occurred saving the workout history", success: false});
                    return;
                } else {
                    console.log(`[${dirName}] Saving logged workout was successful`);
                    res.send({data: workout_logged, success: true});
                    return;
                }
            })
        } else {
            // user has workout history

            workout_history.workout_history.push({
                workoutID: req.body.workout_history.workoutID,
                date: req.body.workout_history.date,
                time: req.body.workout_history.time,
                friend: req.body.workout_history.friend,
                exercises: req.body.workout_history.exercises,
            });
            workout_history.save((err, data) => {
                if (err) {
                    console.log(`[${dirName}] ERROR: Failed to save logged workout`);
                    console.log(err);
                    res.send({error: "Error occurred logging the workout", success: false});
                    return;
                } else {
                    console.log(`[${dirName}] Saving logged workout was successful`);
                    res.send({data: data, success: true});
                    return;
                }
            });
        }
    })
}
