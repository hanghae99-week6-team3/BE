const ProductService = require("../services/product.services");

class ProductController {
  productService = new ProductService();

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
