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
    // name="Bench Press"
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.query)}`);

    // Define MongoDB query to match any of the muscle groups from request query
    var query = {}
    if (req.query !== undefined) {
        for (var key in req.query) {
            if (["muscles", "mechanics", "force", "utility", "name"].includes(key)) {
                if (query['$and'] === undefined) {
                    query['$and'] = []
                }
                if (key == "muscles") {
                    query['$and'].push(
                        {'muscles.target': { $regex: ".*(" + req.query.muscles.join("|") + ").*", $options: 'i' }}
                    )
                } else if (key == "name") {
                    query['$and'].push({[key]: { $regex: ".*" + req.query[key] + ".*", $options: 'i' }});
                } else {
                    query['$and'].push({['classification.'+key]: { $regex: ".*" + req.query[key] + ".*", $options: 'i' }});
                }
            }
        }
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