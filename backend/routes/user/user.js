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

    db.models.user.findOne({"username": user.username}, (err, find_res) => {
        if (err) {
            // if err, then err is populated and find_res is null
            console.log(`[${dirName}] ERROR: An error occurred finding the user ${user.username}`);
            console.log(err);
            res.send({error: "Error occurred finding the user", success: false});
            return
        }
        else if (find_res == null){
            // this means no user with that username was found, err is null and find_res is null
            user.save((err, userData) => {
                if (err) {
                    console.log(`[${dirName}] ERROR: Failed to save ${user.username}`);
                    console.log(err);
                    res.send({userData: userData, success: false});
                } else {
                    console.log(`[${dirName}] Saving ${user.username} was successful`);
                    res.send({userData: userData, success: true});
                }
            })
        }
        else{
            // if user is found, error is null and find_res is populated
            res.send({error: "Username already exists", userExists: true, success: false});
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

module.exports.getCurrentUserData = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.query)}`);
    utils.verifyJWT(req, res, (req, res) => {
        const id = req.JWT_data.id
        const username = req.JWT_data.username

        db.models.user.findById(id, (err, data) => {
            if (err) {
                console.log(`[${dirName}] ERROR: Failed to get ${username}`);
                console.log(err);
                res.send({success: false, error: err});
            } else {
                console.log(`[${dirName}] Getting ${username} was successful`);
                res.send({success: true, data: data});
            }
        });
    })
}

module.exports.patchCurrentUser = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body)}`);

    utils.verifyJWT(req, res, (req, res) => {
        const id = req.JWT_data.id
        const username = req.JWT_data.username

        db.models.user.update({_id: id}, {$set: req.body}, (err, data) => {
            if (err) {
                console.log(`[${dirName}] ERROR: Failed to patch ${username}`);
                console.log(err);
                res.send({success: false, error: err});
            } else {
                console.log(`[${dirName}] Patching ${username} was successful`);
                res.send({success: true, data: data});
            }
        });
    })
}
