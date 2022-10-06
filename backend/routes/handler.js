const express = require("express")
const router = express.Router();

// require the routes to endpoints in the API
const exercise = require("./exercise/exercise")
const user = require("./user/user")

// route endpoints in API to the correct functions
router.post("/api/exercise", exercise.post)
router.get("/api/exercise", exercise.get)

router.post("/api/user", user.post)
router.get("/api/user", user.get)

module.exports = router; 