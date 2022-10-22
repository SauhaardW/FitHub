const db = require("../../db");
const utils = require("../../utils");

const dirName = utils.getDirName(__dirname)

module.exports.send_friendRequest = (req, res) => {

    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body)}`);
    /* The request body must contain the name of the friend to whom the
       user wants to send a request to
    */
    const friend_username = req.body.username;

    utils.verifyJWT(req, res, (req, res) => {
        const username = req.JWT_data.username

        db.models.user.findOne({"username": friend_username}, (err, find_res) => {
            if (err) {
                console.log(`[${dirName}] ERROR: Error finding friend ${friend_username}`);
                console.log(err);
                res.send({error: "Error finding friend", success: false});
                return
            }else if (find_res == null){
                res.send({error: "User does not exist", success: false});
                return
            }

            if (find_res.friend_requests === undefined || find_res.friend_requests == null) find_res.friend_requests = []

            if (find_res.friend_requests.indexOf(username) !== -1) {
                res.send({error: "Friend request already exists", success: false});
                return
            }

            if (find_res.friends.indexOf(username) !== -1) {
                res.send({error: "Already friends with this user", success: false});
                return
            }

            find_res.friend_requests.push(username);

            find_res.save((err, save_res) => {
                if (err) {
                    console.log(`[${dirName}] ERROR: Failed to save ${find_res.username}`);
                    console.log(err);
                    res.send({error: `Failed to save ${find_res.username}`, success: false});
                    return;
                } else {
                    console.log(`[${dirName}] Saving ${find_res.username} was successful`);
                    res.send({data: save_res, success: true});
                }
            })
        });
    })
}

module.exports.accept_friendRequest = (req, res) => {
    // The request body must contain the username of the friend who we want to accept
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body)}`);

    utils.verifyJWT(req, res, (req, res) => {
        const username = req.JWT_data.username
        const id  = req.JWT_data.id
        const friend_username = req.body.username

        db.models.user.findById(id, (err, curr_user) => {
            if (err) {
                console.log(`[${dirName}] ERROR: Error finding user ${id}`);
                console.log(err);
                res.send({error: "Error finding user", success: false});
                return
            }else if (curr_user == null){
                res.send({error: "Current user does not exist", success: false});
                return
            }

            db.models.user.findOne({"username": friend_username}, (err, friend) => {
                if (err) {
                    console.log(`[${dirName}] ERROR: Failed to find ${friend_username}`);
                    console.log(err);
                    res.send({error: `Failed to find ${friend_username}`, success: false});
                    return;
                }else if (friend == null) {
                    var index = curr_user.friend_requests.indexOf(friend_username);
                    curr_user.friend_requests.splice(index, 1); // Remove friend request from current user, 2nd parameter means remove one item only
                    curr_user.save((err, save_res) => { if (err) console.log(`[${dirName}] ERROR: Failed to save ${curr_user.username}`)});
                    res.send({error: "Friend does not exist", success: false});
                    return
                }

                if (curr_user.friends === undefined || curr_user.friends == null) curr_user.friends = []
                if (friend.friends === undefined || friend.friends === null) friend.friends = []

                if (curr_user.friends.indexOf(friend_username) !== -1 ) {
                    res.send({error: "Already friends with this user", success: false});
                    return
                }

                if(curr_user.friend_requests !== undefined &&
                    curr_user.friend_requests !== null &&
                    curr_user.friend_requests.indexOf(friend_username) !== -1) {

                    // Add requester to current user's friends
                    curr_user.friends.push(friend_username);
                    // Remove requester's friend request from current user
                    var index = curr_user.friend_requests.indexOf(friend_username);
                    curr_user.friend_requests.splice(index, 1); // 2nd parameter means remove one item only
                }

                friend.friends.push(username);

                curr_user.save((err, save_res) => {
                    if (err) {
                        console.log(`[${dirName}] ERROR: Failed to save ${curr_user.username}`);
                        console.log(err);
                        res.send({error: `Failed to save ${curr_user.username}`, success: false});
                        return;
                    } else {
                        console.log(`[${dirName}] Adding ${friend_username} was successful`);

                        friend.save((err, _) => {
                            if (err) {
                                console.log(`[${dirName}] ERROR: Failed to save ${friend.username}`);
                                console.log(err);
                                res.send({error: `Failed to save ${friend.username}`, success: false});
                                return;
                            } else {
                                // Send success if no error saving here
                                console.log(`[${dirName}] Adding ${curr_user.username} was successful`);
                                res.send({data: save_res, success: true});
                            }
                        });
                    }
                });
            });
        });
    })
}


module.exports.get_friendRequests = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body)}`);

    utils.verifyJWT(req, res, (req, res) => {
        const username = req.JWT_data.username
        const id  = req.JWT_data.id

        db.models.user.findById(id, (err, curr_user) => {
            if (err) {
                console.log(`[${dirName}] ERROR: Error finding user ${id}`);
                console.log(err);
                res.send({error: "Error finding user", success: false});
                return
            }else if (curr_user == null){
                res.send({error: "Current user does not exist", success: false});
                return
            }

            if (curr_user.friend_requests === undefined || curr_user.friend_requests == null) curr_user.friend_requests = []
            res.send({ friendRequests: curr_user.friend_requests, success: true});
        });
    })
}