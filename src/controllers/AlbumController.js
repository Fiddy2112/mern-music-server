require("dotenv").config();
const Album = require("../models/Album");

class AlbumController {
  // CREATE
  async createAlbum(req, res) {
    const { name, imageURL } = req.body;
    if (!name) {
      res.status(401).json({
        success: false,
        message: "Name is required",
      });
    }
    if (!imageURL) {
      res.status(401).json({
        success: false,
        message: "imageURL is required",
      });
    }
    try {
      const newAlbum = new Album({
        name: name,
        imageURL: imageURL,
      });

      await newAlbum.save();
      res.status(200).json({
        success: true,
        message: "Successfully new Album",
        album: newAlbum,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  //UPDATE
  async updateAlbum(req, res) {
    const { name, imageURL } = req.body;
    try {
      let updatedAlbum = {
        name,
        imageURL,
      };
      const paramsId = { _id: req.params.id };

      updatedAlbum = await Album.findOneAndUpdate(paramsId, updatedAlbum, {
        new: true,
      });
      if (!updatedAlbum) {
        return res.status(401).json({
          success: false,
          message: "Data not found!",
        });
      }
      // successfully
      res.status(200).json({
        success: true,
        message: "Successfully updated!",
        album: updatedAlbum,
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
  async showAlbum(req, res) {
    try {
      const show = { _id: req.params.id };
      const data = await Album.findOne(show);
      res.status(200).json({
        success: true,
        album: data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async showAllAlbum(req, res) {
    try {
      const options = {
        sort: {
          createAt: 1,
        },
      };
      const data = await Album.find(options);
      if (!data) {
        return res.status(401).json({
          success: false,
          message: "Data not found!",
        });
      }

      // successfully
      res.status(200).json({
        success: true,
        message: "Successfully all Album!",
        album: data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  //DELETE
  async deleteAlbum(req, res) {
    try {
      const paramsId = { _id: req.params.id };

      const result = await Album.deleteOne(paramsId);
      if (!result) {
        return res.status(401).json({
          success: false,
          message: "Data not found!",
        });
      }

      res.status(200).json({
        success: true,
        message: "Deleted album successfully",
        album: result,
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

module.exports = new AlbumController();
