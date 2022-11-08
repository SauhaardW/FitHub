const db = require("../../db");
const utils = require("../../utils");
const mongoose = require("mongoose")

const dirName = utils.getDirName(__dirname)

module.exports.scheduleWorkouts = (req, res) => {
    /* The request body must contain the workout id, date of workout, time of 
        the workout, and username of the friend the user wants to schedule workout 
        with. If the last field is empty then the user has scheduled workout with himself
    */
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body)}`);

    utils.verifyJWT(req, res, (req, res) => {
        const username = req.JWT_data.username
        const id  = req.JWT_data.id
        const workoutID = req.body.workoutID;
        const date = req.body.date;
        const time = req.body.time;
        const friend = req.body.friend;

        var friendLength = friend.length;

        db.models.user.findById(id, (err, curr_user) => {
            if (err) {
                console.log(`[${dirName}] ERROR: Error finding user ${id}`);
                console.log(err);
                res.send({error: "Error finding user", success: false});
                return
            }else if (curr_user == null){
                res.send({error: "Current user does not exist", success: false});
                return
            }

            // Check if workoutID is a valid workout
            db.models.workout.findOne({"id": workoutID}, (err, find_res) => {
                if (err) {
                    console.log(`[${dirName}] ERROR: Error finding workout ${workoutID}`);
                    console.log(err);
                    res.send({error: "Error finding workout", success: false});
                    return
                }else if (find_res == null){
                    res.send({error: "Workout does not exist", success: false});
                    return
                }

                // Create schedule workout object and add it to the curr_user's list
                var newScheduledWorkout = {workoutID: workoutID, date: date, time: time, friend: friend};
                curr_user.scheduled_workouts.push(newScheduledWorkout);

                // Check if friend field is not empty  & username is valid
                if(friendLength !== 0){
                    db.models.user.findOne({"username": friend}, (err, user_friend) => {
                        if (err) {
                            console.log(`[${dirName}] ERROR: Error finding friend ${friend}`);
                            console.log(err);
                            res.send({error: "Error finding friend", success: false});
                            return
                        }else if (user_friend == null){
                            res.send({error: "User does not exist", success: false});
                            return
                        }
            
                        if (user_friend.friends.indexOf(username) === -1) {
                            console.log({error: "Unable to schedule workout with " + friend + "since" +  username 
                                        + "is not their friend", success: false});
                            return
                        }
                        
                        /* Create schedule workout object and add it to the friend's scheduledWorkouts list 
                         * iff friend isn't empty. Replace friend username with current user's username in 
                         * the friend property of scheduledWorkouts.
                        */
                        var newFrScheduledWorkout = {workoutID: workoutID, date: date, time: time, friend: username};
                        user_friend.scheduled_workouts.push(newFrScheduledWorkout);

                        user_friend.save((err, save_curr) => {
                            if (err) {
                                console.log(`[${dirName}] ERROR: Failed to save ${user_friend.username}`);
                                console.log(err);
                                res.send({error: `Failed to save ${user_friend.username}`, success: false});
                                return;
                            } else {
                                console.log(`[${dirName}] Saving ${user_friend.username} was successful`);
                            }
                        });
                    });
                }
            
                curr_user.save((err, save_curr) => {
                    if (err) {
                        console.log(`[${dirName}] ERROR: Failed to save ${curr_user.username}`);
                        console.log(err);
                        res.send({error: `Failed to save ${curr_user.username}`, success: false});
                        return;
                    } else {
                        console.log(`[${dirName}] Saving ${curr_user.username} was successful`);
                        res.send({data: save_curr, success: true});
                    }
                });
            });
        });
    });
};

module.exports.getScheduledWorkouts = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body)}`);

    utils.verifyJWT(req, res, (req, res) => {
        const id  = req.JWT_data.id

                let stages = [
                    { $match: {_id: mongoose.Types.ObjectId(id)}},
                ]
                stages = getExerciseInfo(stages);

                mongoose.connection.db.collection('users').aggregate(stages).toArray(function (err, data) {
                    if (err){
                        console.log("Error converting collection to array");
                    }
                    res.send({success: true, data: data});
                });
    })
};




const getExerciseInfo = (stages) => {
    stages.push(
        {
            $lookup: {
                from: 'workouts',
                localField: 'scheduled_workouts.workoutID',
                foreignField: '_id',
                as: 'workout_info'
            }
        },
        { "$addFields": {
                "scheduled_workouts": {
                    "$map": {
                        "input": "$scheduled_workouts",
                        "in": {
                            "$mergeObjects": [
                                "$$this",
                                { "workout_info": {
                                        "$arrayElemAt": [
                                            "$workout_info",
                                            {
                                                "$indexOfArray": [
                                                    "$workout_info._id",
                                                    "$$this.workoutID"
                                                ]
                                            }
                                        ]
                                    } }
                            ]
                        }
                    }
                }
            } },
        {
            $project: {
                "scheduled_workouts.workout_info.username": 0,
                "scheduled_workouts.workout_info.exercises": 0,
                "scheduled_workouts.workoutID": 0,
                "scheduled_workouts.workout_info.__v": 0,
                "scheduled_workouts.workout_info.dislike": 0,
                "scheduled_workouts.workout_info.like": 0,
                "workout_info": 0,
            }
        },
    )
    return stages;
}





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