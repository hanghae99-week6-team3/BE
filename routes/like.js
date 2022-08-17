const express = require("express");
const router = express.Router();

const LikeController = require("../controllers/like.controllers");
const likeController = new LikeController();

router.put("/:productId/like", authMiddleware, likeController.isLiked);

module.exports = router;
