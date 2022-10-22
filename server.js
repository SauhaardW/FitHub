const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

// use dotenv to get environment variables
dotenv.config();

// initialize MongoDB with the .env URL
const db = require("./db");
db.init(process.env.MONGODB_CONNECTION_URL)

// initialize express with .env port, or 3001 by default
const app = express();
const port = process.env.PORT || 3001;
const corsConfig = {
    origin: true,
    credentials: true,
};
app.use(cors(corsConfig));
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// start router
const router = require("./routes/handler")
app.use("/", router)


// Heroku deploy
const path = require("path");
app.use(express.static(path.join(__dirname, "frontend", "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`[SV] Server is running on port: ${port}`);
});