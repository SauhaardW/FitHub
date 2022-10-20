const db = require("../../db");
const utils = require("../../utils");

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
                curr_user.scheduledWorkouts.push(newScheduledWorkout);

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
                        user_friend.scheduledWorkouts.push(newFrScheduledWorkout);

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
        const username = req.JWT_data.username

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

            if (curr_user.scheduled_workouts === undefined || curr_user.scheduled_workouts == null) curr_user.scheduled_workouts = []
            res.send({ scheduledWorkouts: curr_user.scheduled_workouts, success: true});
        });
    })
};