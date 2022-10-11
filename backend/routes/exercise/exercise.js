const db = require("../../db")
const utils = require("../../utils")

const dirName = utils.getDirName(__dirname)

// module.exports.post = (req, res) => {
//     console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body)}`);

//     const exercise = new db.models.exercise(req.body);
//     exercise.save((err, exercise) => {
//         if (err) {
//             console.log(`[${dirName}] ERROR: Failed to save ${exercise.name}`);
//             console.log(err);
//             res.send({name: exercise.name, success: false});
//         } else {
//             console.log(`[${dirName}] Saving ${exercise.name} was successful`);
//             res.send({name: exercise.name, success: true});
//         }
//     })
// }

module.exports.getAll = (req, res) => {
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

module.exports.get = (req, res) => {
    // Accepts a query similar to:
    // muscles=["Quadriceps", "Deltoid, Anterior"]
    // mechanics="Isolated"
    // force="Pull"
    // utility="Auxiliary"
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.query)}`);

    // Define MongoDB query to match any of the muscle groups from request query
    var query = {}
    if (req.query.muscles !== undefined) {
        query['$or'] = [];
        query['$or'].push(...req.query.muscles.map( (muscle) => {
            return {'muscles.target': muscle}
        }))
    }
    if (req.query.mechanics !== undefined) {
        if (query['$and'] === undefined) {
            query['$and'] = []
        }
        query['$and'].push({'classification.mechanics': req.query.mechanics});
    }
    if (req.query.force !== undefined) {
        if (query['$and'] === undefined) {
            query['$and'] = []
        }
        query['$and'].push({'classification.force': req.query.force});
    }
    if (req.query.utility !== undefined) {
        if (query['$and'] === undefined) {
            query['$and'] = []
        }
        query['$and'].push({'classification.utility': req.query.utility});
    }

    db.models.exercise.find(query, (err, data) => {
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