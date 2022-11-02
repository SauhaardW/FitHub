const db = require("../../db");
const utils = require("../../utils");

const dirName = utils.getDirName(__dirname)

module.exports.updateLikeStatus = (req, res) => {
    // The request body must contain the workout id and like status of the workout.
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body)}`);

    utils.verifyJWT(req, res, (req, res) => {
        const id  = req.JWT_data.id
        const username = req.JWT_data.username;
        const workoutID = req.body.workoutID;
        const status = req.body.status;

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
            db.models.workout.findOne({"_id": workoutID}, (err, curr_workout) => {
                if (err) {
                    console.log(`[${dirName}] ERROR: Error finding workout ${workoutID}`);
                    console.log(err);
                    res.send({error: "Error finding workout", success: false});
                    return
                }else if (curr_workout == null){
                    res.send({error: "Workout does not exist", success: false});
                    return
                }

                // Check whether user has already liked or disliked the workout
                if (curr_workout.like.users.includes(id)) {
                    // Check whether user has liked or disliked the workout
                    if (!status){
                        /* Update the dislike status of the workout by adding the user's id to the list of 
                        *  users and incrementing the dislike count by 1. Remove the user's id from the 
                        *  list of users and decrement the like count by 1.
                        */
                        curr_workout.dislike.users.push(id);
                        curr_workout.dislike.count = curr_workout.dislike.count + 1;

                        var index = curr_workout.like.users.indexOf(id);
                        curr_workout.like.users.splice(index, 1); // Remove user from the list of users in like, 2nd parameter means remove one item only
                        curr_workout.like.count = curr_workout.like.count - 1;
                    }

                } else if (curr_workout.dislike.users.includes(id)){
                    // Check whether user has liked or disliked the workout
                    if (status){
                        /* Update the like status of the workout by adding the user's id to the list of 
                        *  users and incrementing the like count by 1. Remove the user's id from the 
                        *  list of users and decrement the dislike count by 1.
                        */
                        curr_workout.like.users.push(id);
                        curr_workout.like.count = curr_workout.like.count + 1;

                        var index = curr_workout.dislike.users.indexOf(id);
                        curr_workout.dislike.users.splice(index, 1); // Remove user from the list of users in like, 2nd parameter means remove one item only
                        curr_workout.dislike.count = curr_workout.dislike.count - 1;
                    }
                } else {
                    // Check whether user has liked or disliked the workout
                    if (status){
                        /* Update the like status of the workout by adding the users id to the list of 
                        *  users and incrementing the count by 1 
                        */
                        curr_workout.like.users.push(id);
                        curr_workout.like.count = curr_workout.like.count + 1;
                    } else{
                        /* Update the dislike status of the workout by adding the users id to the list of 
                        *  users and incrementing the count by 1 
                        */
                        curr_workout.dislike.users.push(id);
                        curr_workout.dislike.count = curr_workout.dislike.count + 1;
                    }
                }

                // Save the workout with the updated status
                curr_workout.save((err, save_workout) => {
                    if (err) {
                        console.log(`[${dirName}] ERROR: Failed to save ${save_workout.name}`);
                        console.log(err);
                        res.send({error: `Failed to save ${workout.name}`, success: false});
                        return;
                    } else {
                        console.log(`[${dirName}] Saving ${save_workout.name} was successful`);
                    }
                });
            });
            
        });
    })
};

module.exports.getLikeRatio = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body)}`);

    utils.verifyJWT(req, res, (req, res) => {
        const username = req.JWT_data.username;
        const id  = req.JWT_data.id;
        workoutID = req.body.workoutID;

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
            db.models.workout.findOne({"_id": workoutID}, (err, curr_workout) => {
                if (err) {
                    console.log(`[${dirName}] ERROR: Error finding workout ${workoutID}`);
                    console.log(err);
                    res.send({error: "Error finding workout", success: false});
                    return
                }else if (curr_workout == null){
                    res.send({error: "Workout does not exist", success: false});
                    return
                }

                // Check if total votes for a workout is zero
                if (curr_workout.like.count + curr_workout.dislike.count === 0) {
                    res.send({ LikeRatio: 0, success: true});
                } else {
                    var ratio = (curr_workout.like.count/(curr_workout.like.count + curr_workout.dislike.count))*100;
                    res.send({ data: ratio, success: true});
                }
            });
        });
    })
}
