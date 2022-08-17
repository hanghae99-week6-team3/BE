const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(" ");
    console.log(tokenValue);
    if (tokenType !== "Bearer") {
      res.status(401).send({
        errorMessage: "로그인 후 사용하세s요",
      });
      return;
    }
    const { userId } = jwt.verify(tokenValue, process.env.MYSQL_KEY); // userId 는 jwt.sign(userId : user._id)의 user._id가 할당된다.
    console.log(userId);
    User.findOne({ where: { userId: userId } }).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch(error) {
    res
      .status(401)
      .json({ success: false, errorMessage: "로그인이 필요합니다." });
    return;
  };
};
