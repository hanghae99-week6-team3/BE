const LikeService = require("../services/like.services");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class LikeController {
  likeService = new LikeService();

  isLiked = async (req, res) => {
    const { Authorization } = req.headers;
    const { productId } = req.params;
    let [authType, authToken] = Authorization.split(" ");
    const { userId } = jwt.verify(authToken, process.env.MYSQL_KEY);
    const { like } = req.body;
    const likeCount = await this.likeService.isLiked(productId, userId, like);

    res.json({ likeCount });
  };
}

module.exports = LikeController;
