const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth_middlewares");
// const authMiddleware = require("../middlewares/auth_middlewares");

const ProductController = require("../controllers/product.controllers");
const productController = new ProductController();

//product 조회
router.get("/search", productController.getCategriedProducts);
router.get("/:productId", productController.getTargetproduct);
router.get("/", productController.getAllProducts);

//product 생성,수정,삭제
router.post("/", authMiddleware, productController.createProduct);
router.put("/:productId", authMiddleware, productController.updateProduct);
router.delete("/:productId", authMiddleware, productController.deleteProduct);

module.exports = router;

