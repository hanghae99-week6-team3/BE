const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

module.exports = (req, res, next) => {
  const { Authorization } = req.headers;
  if (!Authorization) {
    res
      .status(401)
      .json({ success: false, errorMessage: "로그인이 필요합니다." });
    return;
  }

  try {
    const { userId } = jwt.verify(Authorization, process.env.MYSQL_KEY); // userId 는 jwt.sign(userId : user._id)의 user._id가 할당된다.
    User.findByPk(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    res
      .status(401)
      .json({ success: false, errorMessage: "로그인이 필요합니다." });
    return;
  }
};
