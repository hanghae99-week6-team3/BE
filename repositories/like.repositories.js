const { Product, Like } = require("../models");

class LikeRepository {
  findLikeCount = async (productId) => {
    const product = await Product.findByPk(productId);
    return product.likeCount;
  };
  
  create = async (productId, userId) => {
    await Like.create({ productId, userId });
  };

  destroy = async (productId, userId) => {
    await Like.destroy({ where: { productId, userId } });
  };

  decrement = async (productId) => {
    const like = await Product.findOne({ where: { productId } });
    await like.decrement("likeCount");
  };

  increment = async (productId) => {
    const like = await Product.findOne({ where: { productId } });
    await like.increment("likeCount");
  };
}

module.exports = LikeRepository;
