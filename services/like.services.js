const LikeRepository = require("../repositories/like.repository");

class LikeService {
  likeRepository = new LikeRepository();

  isLiked = async (productId, userId, like) => {
    const user = this.likeRepository.findUser(productId);
    like
      ? (addUser = user.push(userId))
      : (addUser = user.filter((u) => u.userId !== userId));

    await this.likeRepository.update(productId, addUser);
    await this.likeRepository.countLike(productId);

    const likeCount = await this.likeRepository.findLikeCount(productId);

    return likeCount;
  };
}

module.exports = LikeService;
