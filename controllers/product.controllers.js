const { TableHints } = require("sequelize/types");
const ProductService = require("../services/product.services");

class ProductController {
  productService = new ProductService();

  // prodcut 전체 조회 api
  getAllProducts = async (req, res) => {
    const { userId } = res.locals.user;
    const ProductsData = await this.productService.findAllproducts(userId);
    res.json({ data: [ProductsData] });
  };

  //카테고리별 prodcut 조회 api
  getCategriedProducts = async (req, res) => {
    const { userId } = res.locals.user;
    const category = req.query;
    const CategriedProductsData =
      await this.productService.findCategoryrproducts(category, userId);
    res.json({ data: [CategriedProductsData] });
  };

  //상세 prodcut 조회 api
  getTargetproduct = async (req, res) => {
    const { productId } = req.params;
    const { userId } = res.locals.user;
    const detailProductData = await this.productService.findTargetproduct(
      productId, userId
    );
    res.json({ data: detailProductData });
  };

  createProduct = async (req, res) => {
    const { title, category, location, price, content } = req.body;
    const { nickname } = res.locals.user;

    await this.productService.createProduct(
      nickname,
      title,
      category,
      location,
      price,
      content
    );

    res.json({ message: "success" });
  };

  updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { title, category, location, price, content } = req.body;

    await this.productService.updateProduct(
      productId,
      title,
      category,
      location,
      price,
      content
    );

    res.json({ message: "success" });
  };

  deleteProduct = async (req, res) => {
    const { productId } = req.params;

    await this.productService.deleteProduct(productId);

    res.json({ message: "success" });
  };
}

module.exports = ProductController;
