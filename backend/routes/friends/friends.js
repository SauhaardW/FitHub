const db = require("../../db")
const utils = require("../../utils")

const dirName = utils.getDirName(__dirname)

module.exports.get = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.query)}`);

    db.models.user.findOne(req.query, (err, data) => {
        if (err) {
            console.log(`[${dirName}] ERROR: Failed to get ${JSON.stringify(req.query)}`);
            console.log(err);
            res.send({success: false, error: err});
        } else {
            console.log(`[${dirName}] Getting ${JSON.stringify(req.query)}, ${data.friends} was successful`);
            res.send({success: true, "data": data["friends"]});
        }
    });
}