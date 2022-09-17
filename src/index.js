require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db/index");
const app = express();

const authRouter = require("./routes/auth");
const artistsRouter = require("./routes/artist");
const albumsRouter = require("./routes/album");
const songsRouter = require("./routes/song");

const port = process.env.PORT || 8080;

// Connect to DB
db.connect();

app.use(express.json());
app.use(cors());

// user authentication route
app.use("/api/auth", authRouter);

// Artists Route
app.use("/api/artist", artistsRouter);

// Alums Route
app.use("/api/album", albumsRouter);

// Songs Route
app.use("/api/song", songsRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
