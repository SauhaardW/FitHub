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
                console.log(`[${dirName}] ERROR: Could not find friend ${friend_username}`);
                console.log(err);
                res.send({error: "Could not find friend", success: false});
                return
            }
            if (find_res.friend_requests === undefined) requested.friend_requests = []

            if (find_res.friend_requests.indexOf(username) !== -1) {
                res.send({error: "Friend request already exists", success: false});
                return
            }

            if (find_res.friends.indexOf(username) !== -1) {
                res.send({error: "Friend already exists", success: false});
                return
            }

            find_res.friend_requests.push(username);
    
            find_res.save((err, save_res) => {
                if (err) {
                    console.log(`[${dirName}] ERROR: Failed to save ${find_res.username}`);
                    console.log(err);
                    res.send({data: save_res, success: false});
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
                console.log(`[${dirName}] ERROR: Could not find user ${id}`);
                console.log(err);
                res.send({error: "Could not find user", success: false});
                return
            }

            if (curr_user.friends === undefined) curr_user.friends = []

            if (curr_user.friends.indexOf(friend_username) !== -1 ) {
                res.send({error: "Friend already exists", success: false});
                return
            }

            if(curr_user.friend_requests !== undefined && curr_user.friend_requests.indexOf(friend_username) !== -1){
                // Add requester to current user's friends
                curr_user.friends.push(friend_username);
                // Remove requester's friend request from current user
                var index = curr_user.friend_requests.indexOf(friend_username);
                curr_user.friend_requests.splice(index, 1); // 2nd parameter means remove one item only
    
                // Save current user data
                curr_user.save((err, save_res) => {
                    if (err) {
                        console.log(`[${dirName}] ERROR: Failed to save ${curr_user.username}`);
                        console.log(err);
                        res.send({data: save_res, success: false});
                    } else {
                        // If data saves without problem, find friend data
                        db.models.user.findOne({"username": friend_username}, (err, friend) => {
                            if (err) {
                                console.log(`[${dirName}] ERROR: Failed to find ${friend_username}`);
                                console.log(err);
                                res.send({data: friend_username, success: false});
                            } else {
                                if (friend.friends === undefined) friend.friends = []
                                // Add current user to requester's friends
                                friend.friends.push(username);
                                // Save requesters data
                                friend.save((err, save_res) => {
                                    if (err) {
                                        console.log(`[${dirName}] ERROR: Failed to save ${friend.username}`);
                                        console.log(err);
                                        res.send({data: save_res, success: false});
                                    } else {
                                        // Send success if no error saving here
                                        console.log(`[${dirName}] Adding ${friend_username} was successful`);
                                        res.send({name: friend_username, success: true});
                                    }
                                })
                            }
                        });
                    }
                })
            }
        });
    })
}