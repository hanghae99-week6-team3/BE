const { Comment } = require("../models");

//댓글 조회 API
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
  res.status(200).json({ commentDatas });
};

//댓글 작성 API
const postComment = async (req, res) => {
  const { content } = req.body;
  const { productId } = req.params;
  if (!content) {
    return res.status(400).json({
      success: false,
      errorMessage: "댓글내용이 없습니다.",
    });
  }
  await Comment.create({
    content,
    productId,
    nickname,
  });

  res.status(201).json({ message: "success" });
};

//댓글 수정 API
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

//댓글 삭제 API
const deletComment = async (req, res) => {
  const { commentId } = req.params;

  await Comment.destroy({
    where: { commentId: commentId },
  });
  res.status(200).json({ message: "success" });
};

module.exports = { getAllComment, postComment, updateComment, deletComment };