const express = require("express");
const authMiddleware = require("../middlewares/auth_middlewares");
const router = express.Router();
const {
  getAllComment,
  postComment,
  updateComment,
  deletComment,
} = require("../controllers/comment.controllers");

router
  .route("/product/comment/:productId")
  .post(authMiddleware, postComment)
  .get(getAllComment);

router.route("/comment/:commentId").put(authMiddleware, updateComment).delete(authMiddleware, deletComment);

module.exports = router;
