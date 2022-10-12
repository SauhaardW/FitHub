const db = require("../../db")
const utils = require("../../utils")

const dirName = utils.getDirName(__dirname)

module.exports.post = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body.username)}`);

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
            workout.save((err, workoutData) => {
                if (err) {
                    console.log(`[${dirName}] ERROR: Failed to save ${workout.name}`);
                    console.log(err);
                    res.send({error: "Error occurred saving the workout", success: false});
                    return;
                } else {
                    console.log(`[${dirName}] Saving ${workout.name} was successful`);
                    res.send({data: workoutData, success: true});
                    return;
                }
            })
        }
        else{
            res.send({error: "Workout with given name already exists", workoutExists: true, success: false});
            return;
        }
    })
}