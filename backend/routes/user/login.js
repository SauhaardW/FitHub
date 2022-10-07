const db = require("../../db");
const utils = require("../../utils");
const bcrypt = require('bcrypt-nodejs');
const jwt = require("jsonwebtoken");

const dirName = utils.getDirName(__dirname)

module.exports.post = (req, res) => {
    console.log(`[${dirName}] ${req.method} ${JSON.stringify(req.body)}`);

    const username = req.body.username;
    const password = req.body.password;

    const user = db.models.user.findOne({username: username}, (err, data) => {
        if (err) {
            // If there is an error finding the user in the DB, serve error
            console.log(`[${dirName}] ERROR: Failed to get ${JSON.stringify(req.query)}`);
            console.log(err);
            res.send({success: false, error: err});
        } else {
            if (!data) {
                // If the data is empty, there is no user, serve error
                return res.json({success: false, error: "Incorrect Username or Password"})
            }
            
            // Compare the password from body with the user's password
            bcrypt.compare(password, user.password, (match) => {
                if (match === true) {
                    // If the passwords match
                    const payload = {
                        id: data._id,
                        username: data.username
                    }

                    // Sign JWT
                    jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        {expiresIn: 86400},
                        (err, token) => {
                            // If error while signing, server error
                            if (err) return res.json({success: false, error: err});
                            // Serve JWT token
                            console.log(`[${dirName}] Signed in user: ${JSON.stringify(req.body.username)}`);
                            res.cookie("x-access=token", "Bearer " + token);
                            return res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        }
                    )
                } else {
                    // Passwords don't match, serve error
                    return res.json({success: false, error: "Incorrect Username or Password"})
                }
            })
        }
    })
}