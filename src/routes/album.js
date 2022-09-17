const express = require("express");
const router = express.Router();
const albumController = require("../controllers/AlbumController");

router.post("/createAlbum", albumController.createAlbum);
router.put("/updateAlbum/:id", albumController.updateAlbum);
router.delete("/deleteAlbum/:id", albumController.deleteAlbum);
router.get("/getAlbum/:id", albumController.showAlbum);
router.get("/getAllAlbum/", albumController.showAllAlbum);

module.exports = router;
