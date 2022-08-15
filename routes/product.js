const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/auth_middlewares");

const ProductController = require("../controllers/product.controllers");
const productController = new ProductController();

// router.get("/", productController.getProducts);
// router.get("/", productController.getCategory);
// router.get("/:productId", productController.getProduct);
router.post("/", productController.createProduct);
router.put("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);

module.exports = router;
