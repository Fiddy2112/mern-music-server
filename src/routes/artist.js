const express = require("express");
const router = express.Router();
const artistController = require("../controllers/ArtistController");

router.post("/createArtist", artistController.createArtist);
router.delete("/deleteArtist/:id", artistController.deleteArtist);
router.put("/updateArtist/:id", artistController.updateArtist);
router.get("/getArtist/:id", artistController.showArtist);
router.get("/getAllArtist", artistController.showAllArtist);

module.exports = router;
