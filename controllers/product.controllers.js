const ProductService = require("../services/product.services");
const CommnetService = require("../services/comment.services");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// const { User } = require("../models");

class ProductController {
  productService = new ProductService();
  commnetService = new CommnetService();

  // prodcut 전체 조회 api ok
  getAllProducts = async (req, res) => {
    const ProductsData = await this.productService.findAllproducts_none();
    res.json({ data: [ProductsData] });
  };

  //카테고리별 prodcut 조회 api ok
  getCategriedProducts = async (req, res) => {
    // const { Authorization } = req.headers;
    const { category } = req.query;
    const CategriedProductsData =
      await this.productService.findCategoryrproducts_none(category);

    res.json({ data: [CategriedProductsData] });
  };

  //상세 prodcut 조회 api ok
  getTargetproduct = async (req, res) => {
    const { productId } = req.params;
    const product = await this.productService.findTargetproduct(productId);
    const detailcommentdata = await this.commnetService.findTargetcomment(
      productId
    );
    return res.json({
      data: { product, comment: detailcommentdata },
    });
  };

  //product 게시글 제작 ok
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

  //product 게시글 수정 ok
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

  //product 게시글 수정 ok
  deleteProduct = async (req, res) => {
    const { productId } = req.params;

    await this.productService.deleteProduct(productId);

    res.json({ message: "success" });
  };
}
module.exports = ProductController;
