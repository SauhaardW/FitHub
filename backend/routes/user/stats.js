const db = require("../../db");
const utils = require("../../utils");

const dirName = utils.getDirName(__dirname)

module.exports.log_stat = (req, res) => {
    // The request body must contain the name of the statistic, the date, and the value
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body)}`);

    utils.verifyJWT(req, res, (req, res) => {
        const id  = req.JWT_data.id

        db.models.stats.findOne({userID: id}, (err, stats) => {
            if (err) {
                console.log(`[${dirName}] ERROR: Error finding stats for user ${id}`);
                console.log(err);
                res.send({error: "Error finding stats for user", success: false});
                return
            }

            if (stats == null) {
                // If the user has no stats logged, create a new instance of it
                var model = db.models.stats({
                    userID: id,
                    [req.body.name]: [{
                        date: req.body.date,
                        value: req.body.value
                    }]
                });
                // Save the instance of stats
                model.save((err, data) => {
                    if (err) {
                        console.log(`[${dirName}] ERROR: Failed to save ${req.body.name}`);
                        console.log(err);
                        res.send({error: "Error occurred logging the statistic", success: false});
                    } else {
                        console.log(`[${dirName}] Saving ${req.body.name} was successful`);
                        res.send({userData: data, success: true});
                    }
                })
            } else {
                // The user does have stats
                // Check if the stat has already been logged before
                if (stats[req.body.name] !== undefined) {
                    // Add to the stat array
                    stats[req.body.name].push({
                        date: req.body.date,
                        value: req.body.value
                    })
                } else {
                    // The user has never logged this stat before, create it 
                    stats[req.body.name] = [{
                        date: req.body.date,
                        value: req.body.value
                    }]
                }

                // Save the stats data
                stats.save((err, data) => {
                    if (err) {
                        console.log(`[${dirName}] ERROR: Failed to save ${req.body.name}`);
                        console.log(err);
                        res.send({error: "Error occurred logging the statistic", success: false});
                    } else {
                        console.log(`[${dirName}] Saving ${req.body.name} was successful`);
                        res.send({userData: data, success: true});
                    }
                })
            }
        });
    })
}

module.exports.get_stat = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.query)}`);
    utils.verifyJWT(req, res, (req, res) => {
        const id = req.JWT_data.id
        const username = req.JWT_data.username

        db.models.user.findById(id, (err, data) => {
            if (err) {
                console.log(`[${dirName}] ERROR: Error finding user ${username}`);
                console.log(err);
                res.send({error: "Error finding user", success: false});
                return
            }else if (curr_user == null){
                res.send({error: "Current user does not exist", success: false});
                return
            }
            // Check if current userId has a body stats entry
            db.models.workout.findOne({"userID": mongoose.Types.ObjectId(id)}, (err, curr_stat) => {
                if (err) {
                    console.log(`[${dirName}] ERROR: Error finding body stat for ${id}`);
                    console.log(err);
                    res.send({error: "Error finding body stat for current user", success: false});
                    return
                }else if (curr_workout == null){
                    res.send({error: "Body stat for current user does not exist", success: false});
                    return
                }else {
                    console.log(`[${dirName}] Getting body stat for ${id} was successful`);
                    res.send({success: true, data: curr_stat});
                }

            });
        });
    })
}
