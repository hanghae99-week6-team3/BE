const { Comment } = require("../models");

class CommentRepository {
  //productId기준 댓글 갯수
  findAllcomments = async (productId) => {
    const product = await Comment.findAll({
      where: { productId: productId },
      
    });
    return product;
  };
  // //productId기준 댓글 데이터
  // comments = async (productId) => {
  //   const CommentData = await commentDataTable.findAll({
  //     where: { productId: productId },
  //   });
  //   return {
  //     content: CommentData.content,
  //     nickname: CommentData.nickname,
  //     createdAt: CommentData.createdAt,
  //   };
}
//productId기준 댓글 데이터
findOne = async (productId) => {
  const CommentData = await commentDataTable.findAll({
    where: { productId: productId },
  });
  return {
    content: CommentData.content,
    nickname: CommentData.nickname,
    createdAt: CommentData.createdAt,
  };
};

module.exports = CommentRepository;
