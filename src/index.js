require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db/index");
const authRouter = require("./routes/auth");
const app = express();

const port = process.env.PORT || 8080;

// Connect to DB
db.connect();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
