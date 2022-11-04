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
