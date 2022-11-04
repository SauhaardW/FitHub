const db = require("../../db")
const utils = require("../../utils")
const mongoose = require("mongoose")

const dirName = utils.getDirName(__dirname)

module.exports.logWorkout = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body.workout_history.workoutID)}`);

    var workoutData = req.body.workout_history;
    console.log("my date is: " + workoutData.date);


    //do regex check to ensure date is valid format pls
    workoutData.date = new Date(workoutData.date);
    console.log("my date is: " + workoutData.date);

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



module.exports.getLoggedWorkouts = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.query)}`);
    //Note: for frontend to convert datetime from UTC to localtime
    //this endpoint takes a request body and query param "subset" which is true or false depeding on if you a user's entire
    //workout history, or only the last 30 days

    utils.verifyJWT(req, res, (req, res) => {
        const id = req.JWT_data.id

        let stages = [
            { $match: {userID: mongoose.Types.ObjectId(id)}},
            { $unwind: '$workout_history'},
        ]
        if (req.query.subset === "true"){
            stages.push({ $match:
                    { $expr:
                            {$and: [
                                { $gt: [
                                        "$workout_history.date",
                                        { $subtract: [ "$$NOW", 30 * 24 * 60 * 60 * 1000] } ]
                                },
                                    { $lt: [
                                            "$workout_history.date",
                                            { $subtract: [ "$$NOW", 0] } ]
                                    }
                            ]}
                    }
            })
        }

        stages.push(
            { "$project": { "workout_history.workoutID": 1, "workout_history.date": 1, "workout_history.friend": 1, "workout_history.exercises": 1, "_id": 0 } },
            { $sort: { "workout_history.date": -1 } },
        )

        stages = getWorkoutName(stages);
        stages = getExerciseInfo(stages);

        mongoose.connection.db.collection('workouthistories').aggregate(stages).toArray(function (err, data) {
            if (err){
                console.log("Error converting collection to array");
            }
            res.send({success: true, data: data});
        });
    });
};

const getWorkoutName = (stages) => {
    stages.push(
        { $lookup: {
                from: 'workouts',
                localField: 'workout_history.workoutID',
                foreignField: '_id',
                pipeline: [ {$project: {name: 1, _id: 0} } ],
                as: 'workout_name'
            }
        },
        { $unwind: "$workout_name" },
        { $addFields: {
                "workout_history.workout_name":  "$workout_name.name"  ,
            }
        },
        { "$project": { "workout_name": 0 } }
    )
    return stages;
}

const getExerciseInfo = (stages) => {
    stages.push(
        {
            $lookup: {
                from: 'exercises',
                localField: 'workout_history.exercises.exerciseID',
                foreignField: '_id',
                as: 'exercise_info'
            }
        },
        { "$addFields": {
                "workout_history.exercises": {
                    "$map": {
                        "input": "$workout_history.exercises",
                        "in": {
                            "$mergeObjects": [
                                "$$this",
                                { "exercise_info": {
                                        "$arrayElemAt": [
                                            "$exercise_info",
                                            {
                                                "$indexOfArray": [
                                                    "$exercise_info._id",
                                                    "$$this.exerciseID"
                                                ]
                                            }
                                        ]
                                    } }
                            ]
                        }
                    }
                }
            } },
        { "$project": { "exercise_info": 0, "workout_history.exercises.exerciseID": 0 } }
    )
    return stages;
}

