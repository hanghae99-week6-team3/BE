const express = require("express");
const router = express.Router();
const {
  getAllComment,
  postComment,
  updateComment,
  deletComment,
} = require("../controllers/comment");

router
  .route("/product/comment/:productId")
  .post(postComment)
  .get(getAllComment);

router.route("/comment/:commentId").put(updateComment).delete(deletComment);

module.exports = router;
