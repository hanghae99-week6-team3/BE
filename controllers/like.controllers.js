const LikeService = require("../services/like.services");

class LikeController {
  likeService = new LikeService();

  isLiked = async (req, res) => {
    const { productId } = req.params;
    const { userId } = res.locals.user;
    const { like } = req.body;
    const likeCount = await this.likeService.isLiked(productId, userId, like);

    res.json({ likeCount });
  };
}

module.exports = LikeController;
