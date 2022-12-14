const express = require("express");
const authController = require("../controllers/AuthController");
const router = express.Router();

router.get("/login", authController.login);
router.get("/getUsers", authController.getUsers);

module.exports = router;
