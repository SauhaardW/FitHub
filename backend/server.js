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
app.use(cors());
app.use(express.json());

// start router
const router = require("./routes/handler")
app.use("/", router)


app.listen(port, () => {
    console.log(`[SV] Server is running on port: ${port}`);
});