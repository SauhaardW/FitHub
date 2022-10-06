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