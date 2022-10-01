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
        weight: {type:Number, required:true},
        height: {type:Number, required:true},
        experience: {type:String, required:true},
        friends: [mongoose.Schema.Types.ObjectId],
        friend_requests: [mongoose.Schema.Types.ObjectId],
        last_workout: {type: Date, default: Date.now},
        streak: {type:Number},
    });
    userSchema.methods.generateHash = (password) => { return bcrypt.genSaltSync(8), null };
    userSchema.methods.validPassword = (password) => { return bcrypt.compareSync(password, this.password) };
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