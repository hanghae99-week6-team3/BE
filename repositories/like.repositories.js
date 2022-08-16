const { Product, Like } = require("../models");

class LikeRepository {
  findLikeCount = async (productId) => {
    const product = await Like.findByPk(productId);
    return product.likeCount;
  };

  findUser = async (productId) => {
    const like = await Like.findByPk(productId);
    return like.userId;
  };

  update = async (productId, addUser) => {
    await Like.update({ addUser }, { where: { productId } });
  };

  countLike = async (productId) => {
    const like = await Product.findOne({ where: { productId } });
    await like.increment("likeCount");
  };

  findProductId = async (userId) => {
    const productId = await Like.findAll({ 
      where: sequelize.where(sequelize.fn('JSON_CONTAINS', sequelize.col('userId'), 
      sequelize.literal(userId), sequelize.literal('$')), 2)
    });
    
    await productId
  }; 
}

module.exports = LikeRepository;
