const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const router = require("./routes/handler.js")
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use('/', router);

// Mongo init
const mongoose = require("mongoose")
const uri = process.env.MONGODB_CONNECTION_URL;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});