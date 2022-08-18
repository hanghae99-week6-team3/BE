const UserService = require("../services/user.services");
const jwt = require("jsonwebtoken");
// const res = require("express/lib/response");
// const req = require("express/lib/request");
require("dotenv").config();

class UsersController {
  userService = new UserService();

  //회원가입 ok
  createUser = async (req, res, next) => {
    const { userId, nickname, password } = req.body;

    await this.userService.createUser(userId, nickname, password);
    res.status(200).json({
      success: true,
    });
  };
  //login ok
  Login = async (req, res, next) => {
    const { userId, password } = req.body;
    const user = await this.userService.Login(userId, password);

    if (!user) {
      res.status(400).json({
        success: false,
        errorMessage: "ID or Password is wrong",
      });
      return;
    }

    let payload = { userId: user.userId, nickname: user.nickname };
    const token = jwt.sign(payload, process.env.MYSQL_KEY, { expiresIn: "7d" });

    res.json({
      token,
    });
  };
  //중복확인  ok
  DoubleCheck = async (req, res, next) => {
    const { key, value } = req.body;
    let user;
    if (key == "userId") {
      user = await this.userService.findOneUser_userId(value);
    }
    if (key == "nickname") {
      user = await this.userService.findOneUser_nickname(value);
    }
    if (!user) {
      return res.status(200).json({ ok: true });
    }
    return res.status(200).json({ ok: false });
  };
}
module.exports = UsersController;
