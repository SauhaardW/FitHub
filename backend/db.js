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
    });
    const user = mongoose.model("user", userSchema);
    models.user = user;
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