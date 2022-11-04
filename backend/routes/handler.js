const express = require("express");
const router = express.Router();

// require the routes to endpoints in the API
const exercise = require("./exercise/exercise");
const user = require("./user/user");
const login = require("./user/login");
const stats = require("./user/stats");
const friend_request = require("./friends/friend_request")
const workout = require("./workout/workout")
const workoutHistory = require("./workout/workoutHistory")
const schedule = require("./schedule/schedule_workouts")
const like_status = require("./user/like_status")

// route endpoints in API to the correct functions
// as of now, we do not need an endpoint to create new exercises
// router.post("/api/exercise", exercise.post);
router.get("/api/exercise/filter", exercise.get);
router.get("/api/exercise/all", exercise.getAll);

router.post("/api/user", user.post);
router.get("/api/user", user.get);
router.get("/api/user/filter-by-username", user.filterByUsername);
router.get("/api/current-user", user.getCurrentUserData);
router.patch("/api/current-user", user.patchCurrentUser);

router.post("/api/login", login.post);

router.post("/api/like-status", like_status.updateLikeStatus);
router.get("/api/get-like-ratio", like_status.getLikeRatio);


router.post("/api/send-friend-request", friend_request.send_friendRequest);
router.post("/api/accept-friend-request", friend_request.accept_friendRequest);
router.get("/api/get-friend-requests", friend_request.get_friendRequests);

router.post("/api/workouts", workout.post);
router.get("/api/workouts", workout.getUserWorkouts);
router.get("/api/workout", workout.getWorkout);

router.post("/api/workout-history", workoutHistory.logWorkout);
router.get("/api/workout-history", workoutHistory.getLoggedWorkouts);

router.post("/api/schedule-workout", schedule.scheduleWorkouts);
router.get("/api/scheduled-workouts", schedule.getScheduledWorkouts);

router.post("/api/stats", stats.log_stat);

module.exports = router;