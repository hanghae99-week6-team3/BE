const LikeRepository = require("../repositories/like.repository");

class LikeService {
  likeRepository = new LikeRepository();

  isLiked = async (productId, userId, like) => {
    if (like !== true) {
      await this.likeRepository.create(productId, userId);
      await this.likeRepository.increment(productId);
    } else {
      await this.likeRepository.destroy(productId, userId);
      await this.likeRepository.decrement(productId);
    }

    const likeCount = await this.likeRepository.findLikeCount(productId);

    return likeCount;
  };
}

module.exports = LikeService;
