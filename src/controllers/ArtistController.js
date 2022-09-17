require("dotenv").config();
const Artist = require("../models/Artist");

class ArtistController {
  // CREATE
  async createArtist(req, res) {
    const { name, imageURL, instagram } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    } else if (!imageURL) {
      return res.status(400).json({
        success: false,
        message: "imageURL is required",
      });
    } else if (!instagram) {
      return res.status(400).json({
        success: false,
        message: "instagram is required",
      });
    }

    try {
      const newArtist = new Artist({
        name: name,
        imageURL: imageURL,
        instagram: instagram,
      });
      // save
      await newArtist.save();

      res.status(200).json({
        success: true,
        message: "Successfully - Artist",
        artist: newArtist,
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
  async updateArtist(req, res) {
    const { name, imageURL, instagram } = req.body;

    try {
      let updatedArtist = {
        name: name,
        imageURL: imageURL,
        instagram: instagram,
      };

      const options = {
        new: true,
      };

      const paramsId = { _id: req.params.id };

      updatedArtist = await Artist.findOneAndUpdate(
        paramsId,
        updatedArtist,
        options
      );

      if (!updatedArtist) {
        return res.status(401).json({
          success: false,
          message: "Data not found!",
        });
      }

      res.status(200).json({
        success: true,
        message: "Successfully - updated!",
        artist: updatedArtist,
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
  async showArtist(req, res) {
    try {
      const findArtist = await Artist.findOne({ _id: req.params.id });
      if (!findArtist) {
        return res.status(401).json({
          success: false,
          message: "Data not found!",
        });
      }

      // successfully
      res.status(200).json({
        success: true,
        message: "Successfully Artist!",
        artist: findArtist,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async showAllArtist(req, res) {
    try {
      const options = {
        sort: {
          createAt: 1,
        },
      };

      const data = await Artist.find(options);
      if (!data) {
        return res.status(401).json({
          success: false,
          message: "Data not found!",
        });
      }

      // successfully
      res.status(200).json({
        success: true,
        message: "Successfully all Artists!",
        artist: data,
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
  async deleteArtist(req, res) {
    try {
      const paramsId = { _id: req.params.id };

      const result = await Artist.deleteOne(paramsId);
      if (!result) {
        return res.status(401).json({
          success: false,
          message: "Data not found!",
        });
      }

      res.status(200).json({
        success: true,
        message: "Deleted artist successfully",
        artist: result,
      });
    } catch (err) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

module.exports = new ArtistController();
