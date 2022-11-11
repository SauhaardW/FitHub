const db = require("../../db")
const utils = require("../../utils")
const mongoose = require("mongoose")

const dirName = utils.getDirName(__dirname)

module.exports.logWorkout = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body.workout_history.workoutID)}`);

    var workoutData = req.body.workout_history;

    const dateRegex = new RegExp("^(19|20)\\d\\d-(0[1-9]|1[012])-([012]\\d|3[01])T([01]\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$");
    if (!dateRegex.test(workoutData.date)){
        res.send({success: false, error: "Invalid date format"});
        return;
    }

    workoutData.date = new Date(workoutData.date);

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
            workoutHistory.workout_streak = {streak: 1, last_updated: workoutData.date};

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
            updateStreak(workout_history, req.body.workout_history.date); //javascript is "pass by reference" if you try to modify contents of object

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

const updateStreak = (workout_history, date) => {
    const lastUpdated = new Date(workout_history.workout_streak.last_updated);
    var streak = workout_history.workout_streak.streak;
    var lastUpdatedNextDay = new Date(lastUpdated.getTime()); //clone date
    lastUpdatedNextDay.setDate(lastUpdatedNextDay.getDate() + 1);

    if (lastUpdatedNextDay.getFullYear() === date.getFullYear() && lastUpdatedNextDay.getMonth() === date.getMonth()
        && lastUpdatedNextDay.getDate() === date.getDate()){ // logged workout one day after last updated, streak increases

        streak = streak + 1;
    }else if (lastUpdated.getFullYear() === date.getFullYear() && lastUpdated.getMonth() === date.getMonth()
        && lastUpdated.getDate() === date.getDate()){
        // if logged workout in the same day as last updated, only update streak if the streak just broke today (and that's why last updated is today)
        if (streak === 0){
            streak = 1;
        }//otherwise keep streak the same
    }else{
        streak = 1;
    }

    workout_history.workout_streak.streak = streak;
    workout_history.workout_streak.last_updated = date;
}


module.exports.checkBreakStreak = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body.date)}`);

    utils.verifyJWT(req, res, (req, res) => {
        const id = mongoose.Types.ObjectId(req.JWT_data.id)

        db.models.workoutHistory.findOne({"userID": id}, (err, workout_history) => {
            if (err) {
                console.log(`[${dirName}] ERROR: An error occurred finding the workout history for ${id}`);
                console.log(err);
                res.send({error: "Error occurred finding the workout history", success: false});
                return;
            } else if (workout_history == null) {
                // user has no workout history, regardless of today's date just return streak 0
                res.send({data: {streak: 0, last_updated: null}, success: true});
                return;
            } else {
                // user has workout history, check if today's date should reset streak to 0
                const today = new Date(req.body.date); //request body should have a date object for today

                if (workout_history.workout_streak === null || workout_history.workout_streak.last_updated === undefined){
                    // handle existing workout histories before streak feature (since streak has default value of 0, workout_streak may already exist in database)
                    workout_history.workout_streak = {streak: 0, last_updated: today}
                    saveWorkoutHistory(workout_history, res);
                    return;
                }

                const lastUpdated = workout_history.workout_streak.last_updated;
                var lastUpdatedNextDay = new Date(lastUpdated.getTime()); //clone date
                lastUpdatedNextDay.setDate(lastUpdatedNextDay.getDate() + 1);

                const lastUpdatedToday = (lastUpdated.getFullYear() === today.getFullYear()
                    && lastUpdated.getMonth() === today.getMonth() && lastUpdated.getDate() === today.getDate());

                const lastUpdatedYesterday = (lastUpdatedNextDay.getFullYear() === today.getFullYear()
                    && lastUpdatedNextDay.getMonth() === today.getMonth() && lastUpdatedNextDay.getDate() === today.getDate());

                if (!lastUpdatedToday && !lastUpdatedYesterday){
                    // Let the last day you worked out be day a. On days a, a+1 your streak will remain the same
                    // on day a+2, you're streak will be set to 0 if you have not worked out since day a.
                    if (workout_history.workout_streak.streak !== 0) {
                        workout_history.workout_streak.streak = 0;
                        workout_history.workout_streak.last_updated = today;

                        saveWorkoutHistory(workout_history, res);
                        return;
                    }
                }

                res.send({data: workout_history.workout_streak, success: true});
                return;
            }
        })
    });
};

module.exports.getStreak = (req, res) => {
    utils.verifyJWT(req, res, (req, res) => {
        const id = mongoose.Types.ObjectId(req.JWT_data.id)
        console.log(`[${dirName}] ${req.method} streak ${id}`);

        db.models.workoutHistory.findOne({"userID": id}, (err, workout_history) => {
            if (err) {
                console.log(`[${dirName}] ERROR: An error occurred finding the workout history for ${id}`);
                console.log(err);
                res.send({error: "Error occurred finding the workout history", success: false});
                return;
            } else if (workout_history == null) {
                // user has no workout history, regardless of today's date just return streak 0
                res.send({data: {streak: 0, last_updated: null}, success: true});
                return;
            } else {
                // user has workout history
                res.send({data: workout_history.workout_streak, success: true});
                return;
            }
        })
    });
};

const saveWorkoutHistory = (workout_history, res) => {
    workout_history.save((err, data) => {
        if (err) {
            console.log(`[${dirName}] ERROR: Failed to save updated streak`);
            console.log(err);
            res.send({error: "Error occurred updating streak", success: false});
            return;
        } else {
            console.log(`[${dirName}] Saving logged workout was successful`);
            res.send({data: data.workout_streak, success: true});
            return;
        }
    });
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

