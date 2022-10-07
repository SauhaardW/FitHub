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
        instructions: {type:String, required:true},
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