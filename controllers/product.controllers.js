const ProductService = require("../services/product.services");
const CommnetService = require("../services/comment.services");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const { User } = require("../models");
const cookies = require("cookie-parser");

class ProductController {
  productService = new ProductService();
  commnetService = new CommnetService();

  // prodcut 전체 조회 api
  getAllProducts = async (req, res) => {
<<<<<<< HEAD
    // const { userId } = res.locals.user;
=======
    if(!req.cookies.token){
      return res.status(400).json({message: "토큰 없음"});
    }
    const { userId } = jwt.verify(req.cookies.token, process.env.MYSQL_KEY);
>>>>>>> 작업중
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
    const { productId } = req.params;
    // const { userId } = res.locals.user;
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
    const token = req.cookies.token;
    console.log("!!!@@@", token);
    const { userId } = jwt.verify(token, "my-secret-key"); // userId 는 jwt.sign(userId : user._id)의 user._id가 할당된다.
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
