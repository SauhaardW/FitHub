const db = require("../../db");
const utils = require("../../utils");

const dirName = utils.getDirName(__dirname)

module.exports.scheduleWorkouts = (req, res) => {

    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body)}`);
    /* The request body must contain the workout id, date & time of the workout,
       and list of usernames (friends) the user is scheduling workouts with. If 
       the last field is empty then the user has scheduled workout with himself
    */
    const workoutID = req.body.workoutID;
    const date = req.body.date;
    const time = req.body.time;
    const friend = req.body.friend;

    var friendListLength = friend.length;

    utils.verifyJWT(req, res, (req, res) => {
        const username = req.JWT_data.username

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
        });

        // Check if all the username in friend list are valid
        var loop_count = 0;

        for(loop_count; loop_count < friendListLength; count++){
            db.models.user.findOne({"username": friend[loop_count]}, (err, find_res) => {
                if (err) {
                    console.log(`[${dirName}] ERROR: Error finding friend ${friend[loop_count]}`);
                    console.log(err);
                    res.send({error: "Error finding friend", success: false});
                    return
                }else if (find_res == null){
                    res.send({error: "User does not exist", success: false});
                    return
                }
    
                if (find_res.friends.indexOf(username) === -1) {
                    console.log({error: "Unable to schedule workout with " + friend[loop_count] 
                        + "since" +  username + "is not their friend", success: false});
                    return
                }
            });
        }
        loop_count = 0; // Reset loop counter

        // Create schedule workout object and add it to the user's list
        var newScheduledWorkout = {workoutID: workoutID, date: date, time: time, friend: friend};

        db.models.user.findOne({"username": username}, (err, curr_user) =>{
            curr_user.scheduledWorkouts.push(newScheduledWorkout);

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
            })
        });

        /* If the friend's list is empty then user schedules workout only with himself
         * no additional changes needed
        */
        if(friendListLength === 0){
            return;
        }

        // Create schedule workout object and add it to the friend's list iff it isn't empty
            /* Create a seperate friend list where the curr_friend username  
             * has been popped off and the authenticated username is added
             * to the list
            */
        var currFriendList = [];

        for(loop_count; loop_count < friendListLength; count++){
            currFriendList = friend;
            
            // Add the authenticated user to the list of friends 
            currFriendList.push(username);
            // Remove current friend from the list of friends
            currFriendList.splice(loop_count, 1); // 2nd parameter means remove one item only

            var newFrScheduledWorkout = {workoutID: workoutID, date: date, time: time, friend: currFriendList};

            db.models.user.findOne({"username": friend[loop_count]}, (err, curr_user) =>{
                curr_user.scheduledWorkouts.push(newFrScheduledWorkout);

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
                })
            });

        }
    })
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