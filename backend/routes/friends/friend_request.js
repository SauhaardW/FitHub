const db = require("../../db");
const utils = require("../../utils");

const dirName = utils.getDirName(__dirname)

module.exports.send_friendRequest = (req, res) => {
    // The request body must contain the usernames of the sender and the receiver of the friend request
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body)}`);

    const username = req.body.username;
    const friend_username = req.body.friend_username;

    var requested = db.models.user.findOne({"username": friend_username});
    requested.friend_requests.push(username);
    requested.save((err, _) => {
        if (err) {
            console.log(`[${dirName}] ERROR: Failed to save ${requested.username}`);
            console.log(err);
            res.send({name: requested.username, success: false});
        } else {
            console.log(`[${dirName}] Saving ${requested.username} was successful`);
            res.send({name: requested.username, success: true});
        }
    })

}

module.exports.accept_friendRequest = (req, res) => {
    // The request body must contain the usernames of the sender and the acceptor of the friend request
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body)}`);

    const username = req.body.username;
    const friend_username = req.body.friend_username;

    var acceptor = db.models.user.findOne({"username": username});
    var requester = db.models.user.findOne({"username": friend_username});

    acceptor.friends.push(friend_username);
    var index = acceptor.friend_requests.indexOf(friend_username);
    if (index > -1) { // only splice array when item is found
        array.splice(index, 1); // 2nd parameter means remove one item only
    }
    acceptor.save((err, _) => {
        if (err) {
            console.log(`[${dirName}] ERROR: Failed to save ${acceptor.username}`);
            console.log(err);
            res.send({name: acceptor.username, success: false});
        } else {
            console.log(`[${dirName}] Saving ${requested.username} was successful`);
            res.send({name: acceptor.username, success: true});
        }
    })

    requester.friends.push(username);
    index = acceptor.friend_requests.indexOf(username);
    if (index > -1) { // only splice array when item is found
        array.splice(index, 1); // 2nd parameter means remove one item only
    }
    requester.save((err, _) => {
        if (err) {
            console.log(`[${dirName}] ERROR: Failed to save ${requester.username}`);
            console.log(err);
            res.send({name: requester.username, success: false});
        } else {
            console.log(`[${dirName}] Saving ${requested.username} was successful`);
            res.send({name: requester.username, success: true});
        }
    })

}

module.exports.get = (req, res) => {
    // We do not need any query params
    console.log(`[${dirName}] ${req.method} all friend requests`);

    db.models.user.findOne({}, (err, data) => {
        if (err) {
            console.log(`[${dirName}] ERROR: Failed to get all friends`);
            console.log(err);
            res.send({success: false, error: err});
        } else {
            console.log(`[${dirName}] Getting all friend requests was successful`);
            res.send({success: true, "data": data["friend_requests"]});
        }
    });
}