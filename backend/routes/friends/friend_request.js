const db = require("../../db");
const utils = require("../../utils");

const dirName = utils.getDirName(__dirname)

module.exports.send_friendRequest = (req, res) => {
    
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body)}`);

    const friend_username = req.body.username;

    utils.verifyJWT(req, res, (req, res) => {
        const username = req.JWT_data.username

        var requested = db.models.user.findOne({"username": friend_username});
        requested.friend_requests.push(username);
        requested.save((err, save_res) => {
            if (err) {
                console.log(`[${dirName}] ERROR: Failed to save ${requested.username}`);
                console.log(err);
                res.send({data: save_res, success: false});
            } else {
                console.log(`[${dirName}] Saving ${requested.username} was successful`);
                res.send({data: save_res, success: true});
            }
        })
    })

}