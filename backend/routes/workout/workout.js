const db = require("../../db")
const utils = require("../../utils")

const dirName = utils.getDirName(__dirname)

module.exports.post = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body.username)}`);
    // All fithub recommended workouts are expected to have the experience field filled out

    var workoutData = req.body;
    const workout = new db.models.workout(workoutData);

    db.models.workout.findOne({"name": workout.name, "username": workout.username}, (err, workout_res) => {
        if (err) {
            console.log(`[${dirName}] ERROR: An error occurred finding the workout ${workout.name} for ${workout.username}`);
            console.log(err);
            res.send({error: "Error occurred finding the workout", success: false});
            return;
        }
        else if (workout_res == null){
            workout.save((err, workout_data) => {
                if (err) {
                    console.log(`[${dirName}] ERROR: Failed to save ${workout.name} for ${workout.username}`);
                    console.log(err);
                    res.send({error: "Error occurred saving the workout", success: false});
                    return;
                } else {
                    console.log(`[${dirName}] Saving ${workout.name} was successful`);
                    res.send({data: workout_data, success: true});
                    return;
                }
            })
        }
        else{
            res.send({error: "Workout with given name already exists for this user", workoutExists: true, success: false});
            return;
        }
    })
}


module.exports.getUserWorkouts = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.query)}`);

    utils.verifyJWT(req, res, (req, res) => {
        const id = req.JWT_data.id
        const username = req.JWT_data.username

        db.models.user.findById(id, (err, data) => {
            if (err) {
                console.log(`[${dirName}] ERROR: Failed to find ${username}`);
                console.log(err);
                res.send({success: false, error: err});
                return;
            }else if (data == null){
                res.send({error: `${username} does not exist`, success: false});
                return;
            }else {
                console.log(`[${dirName}] Getting ${username} was successful`);

                db.models.workout.find({
                    $or: [{username: "FitHub", experience: data.experience}, {username: username}],
                }, (err, workout_data) => {
                    if (err) {
                        console.log(`[${dirName}] ERROR: Failed to get workouts for ${username}`);
                        console.log(err);
                        res.send({success: false, error: err});
                        return;
                    } else if (workout_data == null){
                        console.log(`[${dirName}] No workouts exist for ${username}`);
                        res.send({success: true, data: null});
                        return;
                    }else {
                        console.log(`[${dirName}] Getting workouts for ${username} was successful`);
                        res.send({success: true, data: workout_data});
                    }
                });
            }
        });


    });
}