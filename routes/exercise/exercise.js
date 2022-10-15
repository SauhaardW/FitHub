const db = require("../../db")
const utils = require("../../utils")

const dirName = utils.getDirName(__dirname)

module.exports.post = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body)}`);

    const exercise = new db.models.exercise(req.body);
    exercise.save((err, exercise) => {
        if (err) {
            console.log(`[${dirName}] ERROR: Failed to save ${exercise.name}`);
            console.log(err);
            res.send({name: exercise.name, success: false});
        } else {
            console.log(`[${dirName}] Saving ${exercise.name} was successful`);
            res.send({name: exercise.name, success: true});
        }
    })
}

module.exports.get = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.query)}`);

    db.models.exercise.find(req.query, (err, data) => {
        if (err) {
            console.log(`[${dirName}] ERROR: Failed to get ${JSON.stringify(req.query)}`);
            console.log(err);
            res.send({success: false, error: err});
        } else {
            console.log(`[${dirName}] Getting ${JSON.stringify(req.query)} was successful`);
            res.send({success: true, data: data});
        }
    });
}