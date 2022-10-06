const express = require("express")
const router = express.Router();

// require the routes to endpoints in the API
const exercise = require("./exercise/exercise")

// route endpoints in API to the correct functions
router.post("/api/exercise", exercise.post)
router.get("/api/exercise", exercise.get)

module.exports = router; 