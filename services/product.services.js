const ProductRepository = require("../repositories/product.repositories");

class ProductService {
  productRepository = new ProductRepository();

  createProduct = async (
    nickname,
    title,
    category,
    location,
    price,
    content
  ) => {
    const createProductData = await this.productRepository.createProduct(
      nickname,
      title,
      category,
      location,
      price,
      content
    );

    return {
      nickname: createProductData.nickname,
      title: createProductData.title,
      category: createProductData.category,
      location: createProductData.location,
      price: createProductData.price,
      content: createProductData.content,
    };
  };

  updateProduct = async (
    productId,
    title,
    category,
    location,
    price,
    content
  ) => {
    await this.productRepository.updateProduct(
      productId,
      title,
      category,
      location,
      price,
      content
    );

    const updateProduct = await this.productRepository.findProductOne(
      productId
    );

    return {
      productId: updateProduct.productId,
      title: updateProduct.title,
      category: updateProduct.category,
      location: updateProduct.location,
      price: updateProduct.price,
      content: updateProduct.content,
      createdAt: updateProduct.createdAt,
    };
  };

  deleteProduct = async (productId) => {
    const findProduct = await this.productRepository.findProductOne(productId);

    if (!findProduct) throw new Error("댓글이 존재하지 않습니다.");

    await this.productRepository.deleteProduct(productId);

    return {
      productId: findProduct.productId,
      title: findProduct.title,
      category: findProduct.category,
      location: findProduct.location,
      price: findProduct.price,
      content: findProduct.content,
      createdAt: findProduct.createdAt,
    };
  };
}

module.exports = ProductService;
