const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const userController = new UserController();

router.post("/join", userController.createUser);
router.post("/login",  userController.Login);
router.post("/auth", userController.DoubleCheck);

module.exports = router;