const express = require("express")
const router = express.Router();

// require the routes to endpoints in the API
const exercise = require("./exercise/exercise")
const friend_request = require("./friends/friend_request")
const friends = require("./friends/friends")

// route endpoints in API to the correct functions
router.post("/api/exercise", exercise.post)
router.get("/api/exercise", exercise.get)

router.post("/api/send_friend_request", friend_request.send_friendRequest)
router.post("/api/accept_friend_request", friend_request.accept_friendRequest)
router.get("/api/friend_request", friend_request.get)

router.get("/api/friends", friends.get)

module.exports = router; 