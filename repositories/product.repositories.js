const { Product, Comment } = require("../models");
const { Like } = require("../models");

class ProductRepository {
  // =====================================================================
  //전체 products 데이터 res
  // findAllproducts = async () => {
  //   const allproductsData = await Product.findAll();
  //   return allproductsData;
  // };

  //전체 products 데이터 res
  findAllproducts = async () => {
    const allproductsData = await Product.findAll({
      include: [
        {
          model: Like,
          // attributes : attributes,
        },
      ],
    });
    return allproductsData;
  };

  // =====================================================================
  // //userId기준 좋아하는 product데이터 res
  // findlikedProducts = async (userId) => {
  //   const likedProducts = await Like.findAll({ where: { userId } });
  //   return likedProducts;
  // };
  // =====================================================================

  //카테고리별 products 데이터 res
  // findCategoryrproducts = async (category) => {
  //   const CaterproductsData = await Product.findAll({
  //     where: { category: category },
  //   });
  //   return CaterproductsData;
  // };

  findCategoryrproducts = async () => {
    const CaterproductsData = await Product.findAll({
      where: { category: category },
      include: [
        {
          model: Like,
          // attributes : attributes,
        },
      ],
    });
    return CaterproductsData;
  };

  // =====================================================================

  //상세 product 데이터 res
  // targetProduct = async (productId) => {
  //   const targetProductData = await Product.findOne({
  //     where: { productId: productId },
  //   });
  //   return targetProductData;
  // };
  
  targetProduct = async (productId) => {
    const targetProductData = await Product.findOne({
      where: { productId: productId },
      include: [
        {
          model: Like,
          // attributes : attributes,
        },
      ],
    });

    return targetProductData;
  };

  // =====================================================================
  createProduct = async (
    nickname,
    title,
    category,
    location,
    price,
    content,
    img
  ) => {
    const createProductData = await Product.create({
      nickname,
      title,
      category,
      location,
      price,
      content,
      img,
    });

    return createProductData;
  };

  updateProduct = async (
    productId,
    title,
    category,
    location,
    price,
    content,
    img
  ) => {
    const updateProductData = await Product.update(
      { title, category, location, price, content, img },
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
