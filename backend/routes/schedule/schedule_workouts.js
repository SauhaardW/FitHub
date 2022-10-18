const db = require("../../db");
const utils = require("../../utils");

const dirName = utils.getDirName(__dirname)

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