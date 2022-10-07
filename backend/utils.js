const getDirName = (dir_name) => {
    return dir_name.substring(dir_name.search("backend"))
}


const jwt = require("jsonwebtoken");
function verifyJWT(req, res, next) {
    // Get token from headers
    const token = req.cookies["x-access-token"].split(" ")[1];

    if (token) {
        // If token exists, verify it
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            // If token decoding errors, serve error
            if (err) return res.json({success: false, error: "Not Authorized", loggedIn: false});

            // Add JWT_data to request so that other routes can use data
            req.JWT_data = {
                id: decoded.id,
                username: decoded.username
            };

            // Call callback
            next(req, res)
        })
    } else {
        // If token does not exist, serve error
        res.json({success: false, error: "Invalid Authorization Token", loggedIn: false});
    }
}

module.exports = {
    getDirName,
    verifyJWT
}