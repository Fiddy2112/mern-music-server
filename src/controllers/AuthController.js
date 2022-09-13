require("dotenv").config();

const User = require("../models/User");
const admin = require("../config/firebase/firebase.config");

class AuthController {
  async login(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    if (!req.headers.authorization) {
      res.status(500).send({
        message: "Invalid token",
      });
    }
    try {
      const decodedValue = await admin.auth().verifyIdToken(token);
      if (!decodedValue) {
        return res
          .status(401)
          .json({ success: false, message: "Access token not found" });
      } else {
        // Check user exits or not
        const userExits = await User.findOne({ user_id: decodedValue.user_id });
        if (!userExits) {
          // new user data
          const newUser = new User({
            name: decodedValue.name,
            email: decodedValue.email,
            imageURL: decodedValue.picture,
            user_id: decodedValue.user_id,
            email_verified: decodedValue.email_verified,
            role: "member",
            auth_time: decodedValue.auth_time,
          });
          // save
          await newUser.save();

          res.status(200).json({
            success: true,
            message: "Successfully new user!",
            user: newUser,
          });
        } else {
          // update user data
          const filter = { user_id: decodedValue.user_id };

          const option = {
            upsert: true,
            new: true,
          };

          const result = await User.findOneAndUpdate(
            filter,
            {
              auth_time: decodedValue.auth_time,
            },
            option
          );

          if (!result) {
            return res.status(400).json({
              success: false,
              message: "Update failed",
            });
          }
          res.status(200).json({
            success: true,
            message: "Successfully update user!",
            user: result,
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

module.exports = new AuthController();
