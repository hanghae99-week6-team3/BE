const ProductService = require("../services/product.services");
const CommnetService = require("../services/comment.services");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../models");

class ProductController {
  productService = new ProductService();
  commnetService = new CommnetService();

  // prodcut 전체 조회 api
  getAllProducts = async (req, res) => {
    const { Authorization } = req.headers;
    if (!Authorization) {
      const ProductsData = await this.productService.findAllproducts_none();
      return res.json({ data: [ProductsData] });
    }
    let [authType, authToken] = Authorization.split(" ");
    const { userId } = jwt.verify(authToken, process.env.MYSQL_KEY);
    const ProductsData = await this.productService.findAllproducts(userId);
    res.json({ data: [ProductsData] });
  };

  //카테고리별 prodcut 조회 api
  getCategriedProducts = async (req, res) => {
    // const { userId } = res.locals.user;
    const category = req.query;
    const CategriedProductsData =
      await this.productService.findCategoryrproducts(category, userId);
    res.json({ data: [CategriedProductsData] });
  };

  //상세 prodcut 조회 api
  getTargetproduct = async (req, res) => {
    const { Authorization } = req.headers;
    const { productId } = req.params;
    let [authType, authToken] = Authorization.split(" ");
    const { userId } = jwt.verify(authToken, process.env.MYSQL_KEY);
    const detailProductData = await this.productService.findTargetproduct(
      productId,
      userId
    );
    const detailcommentdata = await this.commnetService.findTargetcomment(
      productId
    );
    res.json({ data: { detailProductData, comment: [detailcommentdata] } });
  };

  createProduct = async (req, res) => {
    const { title, category, location, price, content, img } = req.body;
    const { Authorization } = req.headers;
    let [authType, authToken] = Authorization.split(" ");
    const { userId } = jwt.verify(authToken, process.env.MYSQL_KEY);
    const findUser = await User.findByPk(userId);
    const nickname = findUser.nickname;

    await this.productService.createProduct(
      nickname,
      title,
      category,
      location,
      price,
      content,
      img
    );

    res.json({ message: "success" });
  };

  updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { title, category, location, price, content, img } = req.body;

    await this.productService.updateProduct(
      productId,
      title,
      category,
      location,
      price,
      content,
      img
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
