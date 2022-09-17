const express = require("express");
const router = express.Router();
const songController = require("../controllers/SongController");

router.post("/createSong", songController.createSong);
router.delete("/deleteSong/:id", songController.deleteSong);
router.put("/updateSong/:id", songController.updateSong);
router.get("/getSong/:id", songController.showSong);
router.get("/getAllSong", songController.showAllSong);

module.exports = router;
