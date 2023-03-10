const mongoose = require("mongoose")
var bcrypt = require('bcrypt-nodejs');

let conn;
const models = {};

const connect = (url) => {
    console.log("[DB] Attempting connection to MongoDB");

    mongoose.connect(url);

    mongoose.connection.on("error", (err) => {
        console.log(err);
        console.log("[DB] ERROR: Unable to connect to MongoDB, shutting down.");
        process.exit(1);
    });
    conn = mongoose.connection;
    conn.once("open", () => console.log("[DB] Connection to MongoDB successful."));
}

const createSchemas = () => {
    const exerciseSchema = new mongoose.Schema({
        name: {type:String, required:true},
        muscles: {type: {
            target: {type: String}
        }, required: true},
        classification: { type: {
            mechanics: {type: String},
            force: {type: String},
            utility: {type: String},
        }, required: true},
        comments: {type: String, required: false},
        gif: {type: String},
        instructions: { type: {
            preparation: {type: String},
            execution: {type: String}
        }, required: true}
    });
    const exercise = mongoose.model("exercise", exerciseSchema);
    models.exercise = exercise;

    const workoutSchema = new mongoose.Schema({
        name: {type:String, required:true},
        username: {type:String, required:true},
        exercises: {type:[{type: mongoose.Schema.Types.ObjectId, required: true}], required:true},
        experience: {type: String},
        like: {
            users:[{type: String}],
            count:{type: Number, default: 0},
        },
        dislike: {
            users:[{type: String}],
            count:{type: Number, default: 0},
        },
    });
    const workout = mongoose.model("workout", workoutSchema);
    models.workout = workout;

    const workoutHistorySchema = new mongoose.Schema({
        userID: {type: mongoose.Types.ObjectId, required:true},
        workout_streak: {
            streak: {type: Number, default: 0},
            last_updated: {type: Date},
            _id: false,
        },
        workout_history: [{
            workoutID: {type: mongoose.Schema.Types.ObjectId, required:true},
            date: {type: Date, required:true},
            friend: {type: String},
            exercises: [{
                exerciseID: {type: mongoose.Schema.Types.ObjectId, required:true},
                sets_info: [
                    {
                        reps: {type: Number, required: true},
                        weight: {type: Number, required: true},
                        _id: false,
                    }
                ],
                _id: false,
            }],
            _id: false,
        }],
    });
    const workoutHistory = mongoose.model("workoutHistory", workoutHistorySchema);
    models.workoutHistory = workoutHistory;

    const userSchema = new mongoose.Schema({
        name: {type:String, required:true},
        username: {type:String, required:true},
        password: {type:String, required:true},
        email: {type:String, required:true},
        age: {type:Number, required:true},
        weight: {type:Number, required:false},
        height: {type:Number, required:false},
        experience: {type:String, required:true},
        friend_requests: [String],
        friends: [String],
        scheduled_workouts: [{
            workoutID: {type: mongoose.Schema.Types.ObjectId, required:true},
            date: {type: String, required:true},
            time: {type: String, required:true},
            friend: {type: String},
        }],
    });
    const user = mongoose.model("user", userSchema);
    models.user = user;

    const statsSchema = new mongoose.Schema({
        userID: {type: mongoose.Types.ObjectId, required:true},
        weight: [{
            date: {type: String, required:true},
            value: {type: Number, required:true},
        }],
        height: [{
            date: {type: String, required:true},
            value: {type: Number, required:true},
        }],
        upper_arm_circumference: [{
            date: {type: String, required:true},
            value: {type: Number, required:true},
        }],
        forearm_circumference: [{
            date: {type: String, required:true},
            value: {type: Number, required:true},
        }],
        chest_circumference: [{
            date: {type: String, required:true},
            value: {type: Number, required:true},
        }],
        thigh_circumference: [{
            date: {type: String, required:true},
            value: {type: Number, required:true},
        }],
        calf_circumference: [{
            date: {type: String, required:true},
            value: {type: Number, required:true},
        }],
        waist_circumference: [{
            date: {type: String, required:true},
            value: {type: Number, required:true},
        }],
        shoulder_circumference: [{
            date: {type: String, required:true},
            value: {type: Number, required:true},
        }],
    });
    const stats = mongoose.model("stats", statsSchema);
    models.stats = stats;
}

const init = (url) => {
    connect(url);
    createSchemas();
}

module.exports = {
    conn,
    models,
    init,
};