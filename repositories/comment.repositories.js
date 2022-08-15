const commentDataTable = require("../models/comment");

class CommentRepository {
  //productId기준 댓글 갯수
  commentCount = async (productId) => {
    const product = await commentDataTable.findAll({
      where: { productId: productId },
    });

    const commnetCount = product.length;

    return commnetCount;
  };

  //productId기준 댓글 데이터
  comments = async (productId) => {
    const allCommentData = await commentDataTable.findAll({
      where: { productId: productId },
    });
    return {
      content: allCommentData.content,
      nickname: allCommentData.nickname,
      createdAt: allCommentData.createdAt,
    };
  };
}

module.exports = CommentRepository;
