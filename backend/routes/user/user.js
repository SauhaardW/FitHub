const db = require("../../db")
const utils = require("../../utils")
const bcrypt = require("bcrypt-nodejs")

const dirName = utils.getDirName(__dirname)

module.exports.post = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body.username)}`);

    var userData = req.body;
    var salt = bcrypt.genSaltSync(10);
    userData.password = bcrypt.hashSync(userData.password, salt);

    const user = new db.models.user(userData);
    user.save((err, _) => {
        if (err) {
            console.log(`[${dirName}] ERROR: Failed to save ${user.username}`);
            console.log(err);
            res.send({name: user.username, success: false});
        } else {
            console.log(`[${dirName}] Saving ${user.username} was successful`);
            res.send({name: user.username, success: true});
        }
    })
}

module.exports.get = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.query)}`);

    db.models.user.find(req.query, (err, data) => {
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