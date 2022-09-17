require("dotenv").config();
const Song = require("../models/Song");

class SongController {
  // CREATE
  async createSong(req, res) {
    const { name, imageURL, songURL, album, artist, language, category } =
      req.body;
    if (!name) {
      res.status(401).json({
        success: false,
        message: "Name is required",
      });
    }
    if (!imageURL) {
      res.status(401).json({
        success: false,
        message: "ImageURL is required",
      });
    }
    if (!songURL) {
      res.status(401).json({
        success: false,
        message: "SongURL is required",
      });
    }
    if (!artist) {
      res.status(401).json({
        success: false,
        message: "Artist is required",
      });
    }
    if (!language) {
      res.status(401).json({
        success: false,
        message: "Language is required",
      });
    }
    if (!category) {
      res.status(401).json({
        success: false,
        message: "Category is required",
      });
    }
    try {
      const newSong = new Song({
        name,
        imageURL,
        songURL,
        album,
        artist,
        language,
        category,
      });
      //save
      await newSong.save();

      //Successfully
      res.status(200).json({
        success: true,
        message: "Successfully new Song",
        song: newSong,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // UPDATE
  async updateSong(req, res) {
    const { name, imageURL, songURL, album, artist, language, category } =
      req.body;
    try {
      let updatedSong = {
        name: name,
        imageURL: imageURL,
        songURL: songURL,
        album: album,
        artist: artist,
        language: language,
        category: category,
      };
      const paramsId = { _id: req.params.id };

      updatedSong = await Song.findOneAndUpdate(paramsId, updatedSong, {
        new: true,
      });
      if (!updatedSong) {
        return res.status(401).json({
          success: false,
          message: "Data not found!",
        });
      }

      res.status(200).json({
        success: true,
        message: "Successfully - updated!",
        song: updatedSong,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // READ
  async showSong(req, res) {
    try {
      const paramsId = { _id: req.params.id };
      const data = await Song.findOne(paramsId);
      if (!data) {
        return res.status(401).json({
          success: false,
          message: "Data not found!",
        });
      }
      //Successfully
      res.status(200).json({
        success: true,
        message: "Successfully Song!",
        song: data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async showAllSong(req, res) {
    try {
      const options = {
        sort: {
          createAt: 1,
        },
      };
      const data = await Song.find(options);
      if (!data) {
        return res.status(401).json({
          success: false,
          message: "Data not found!",
        });
      }
      //Successfully
      res.status(200).json({
        success: true,
        message: "Successfully Song!",
        songs: data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // DELETE
  async deleteSong(req, res) {
    try {
      const paramsId = { _id: req.params.id };
      const deletedSong = await Song.deleteOne(paramsId);
      if (!deletedSong) {
        return res.status(401).json({
          success: false,
          message: "Data not found",
        });
      }
      //Successfully
      res.status(200).json({
        success: true,
        message: "Deleted song successfully",
        song: deletedSong,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

module.exports = new SongController();
