const { Comment, Product } = require("../models");

//댓글 조회 API ok
const getAllComment = async (req, res) => {
  const { productId } = req.params;
  const commentDatas = await Comment.findAll({
    where: { productId: productId },
    // order: [["createdAt", "DESC"]],
  });
  if (!commentDatas.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "댓글이 없습니다.",
    });
  }
  res.status(200).json(commentDatas);
};

//댓글 작성 API ok
const postComment = async (req, res) => {
  const { content } = req.body;
  const { productId } = req.params;
  const { nickname } = res.locals.user;
  if (!content) {
    return res.json({
      success: false,
      errorMessage: "댓글내용이 없습니다.",
    });
  }
  const comment = await Comment.create({
    content,
    productId,
    nickname,
  });
  const commentCount = await Comment.findAll({
    where: { productId },
  });

  await Product.update(
    { commentCount: commentCount.length },
    { where: { productId } }
  );

  res.status(201).json(comment);
};

//댓글 수정 API ok
const updateComment = async (req, res) => {
  const { content } = req.body;
  const { commentId } = req.params;
  if (!content) {
    return res.status(400).json({
      success: false,
      errorMessage: "댓글내용이 없습니다.",
    });
  }
  await Comment.update(
    { content: content },
    { where: { commentId: commentId } }
  );

  res.status(201).json({ message: "success" });
};

//댓글 삭제 API ok
const deletComment = async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findByPk(commentId);

  await Comment.destroy({
    where: { commentId: commentId },
  });
  const productId = comment.productId;

  await Comment.destroy({
    where: { commentId: commentId },
  });

  const commentCount = await Comment.findAll({
    where: { productId },
  });
  await Product.update(
    { commentCount: commentCount.length },
    { where: { productId } }
  );

  res.status(200).json({ message: "success" });
};

module.exports = { getAllComment, postComment, updateComment, deletComment };
