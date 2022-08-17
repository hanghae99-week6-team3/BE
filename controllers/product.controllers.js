const ProductService = require("../services/product.services");
const CommnetService = require("../services/comment.services");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// const { User } = require("../models");

class ProductController {
  productService = new ProductService();
  commnetService = new CommnetService();

  // prodcut 전체 조회 api
  getAllProducts = async (req, res) => {
    const { Authorization } = req.headers;

    //토큰이 없을 경우
    if (!Authorization) {
      const ProductsData = await this.productService.findAllproducts_none();
      return res.json({ data: [ProductsData] });
    }
    let [authType, authToken] = Authorization.split("");
    const { userId } = jwt.verify(authToken, process.env.MYSQL_KEY);
    const ProductsData = await this.productService.findAllproducts_none();
    res.json({ data: [ProductsData] });
  };

  //카테고리별 prodcut 조회 api
  getCategriedProducts = async (req, res) => {
    const { Authorization } = req.headers;
    const category = req.query;

    //토큰이 없을 경우
    if (!Authorization) {
      const category = req.query;
      const CategriedProductsData =
        await this.productService.findCategoryrproducts_none(category);
      return res.json({ data: [CategriedProductsData] });
    }

    let [authType, authToken] = Authorization.split(" ");
    const { userId } = jwt.verify(authToken, process.env.MYSQL_KEY);
    const CategriedProductsData =
      await this.productService.findCategoryrproducts_none(category);
    res.json({ data: [CategriedProductsData] });
  };

  //상세 prodcut 조회 api
  getTargetproduct = async (req, res) => {
    const { Authorization } = req.headers;
    const { productId } = req.params;

    //토큰이 없을 경우
    if (!Authorization) {
      const detailProductData =
        await this.productService.findTargetproduct_none(productId);
      const detailcommentdata = await this.commnetService.findTargetcomment(
        productId
      );
      return res.json({
        data: { detailProductData, comment: [detailcommentdata] },
      });
    }

    let [authType, authToken] = Authorization.split(" ");
    const { userId } = jwt.verify(authToken, process.env.MYSQL_KEY);
    const detailProductData = await this.productService.findTargetproduct_none(
      productId
    );
    const detailcommentdata = await this.commnetService.findTargetcomment(
      productId
    );
    res.json({ data: { detailProductData, comment: [detailcommentdata] } });
  };

  createProduct = async (req, res) => {
    const { title, category, location, price, content, img } = req.body;
    const { nickname } = res.locals.user;

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
