const { Product, Comment } = require("../models");
const { Like } = require("../models");

class ProductRepository {
  findProductOne = async (productId) => {
    const product = await Product.findOne({
      where: { productId },
      include: [{ model: Like }],
    });

    return product;
  };

  targetProduct = async (productId) => {
    const targetProductData = await Product.findOne({ where: { productId } });

    return targetProductData;
  };

  createProduct = async (
    nickname,
    title,
    category,
    location,
    price,
    content
  ) => {
    const createProductData = await Product.create({
      nickname,
      title,
      category,
      location,
      price,
      content,
    });

    return createProductData;
  };

  updateProduct = async (
    productId,
    title,
    category,
    location,
    price,
    content
  ) => {
    const updateProductData = await Product.update(
      { title, category, location, price, content },
      { where: { productId } }
    );

    return updateProductData;
  };

  deleteProduct = async (productId) => {
    const deleteProductData = await Product.destroy({ where: { productId } });

    return deleteProductData;
  };
}

module.exports = ProductRepository;
