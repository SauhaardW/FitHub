const express = require("express");
const router = express.Router();

// require the routes to endpoints in the API
const exercise = require("./exercise/exercise");
const user = require("./user/user");
const login = require("./user/login");
const friend_request = require("./friends/friend_request")

// route endpoints in API to the correct functions
router.post("/api/exercise", exercise.post);
router.get("/api/exercise", exercise.get);

router.post("/api/user", user.post);
router.get("/api/user", user.get);
router.get("/api/current-user", user.getCurrentUserData);
router.patch("/api/current-user", user.patchCurrentUser);

router.post("/api/login", login.post);

router.post("/api/send-friend-request", friend_request.send_friendRequest)

module.exports = router; 