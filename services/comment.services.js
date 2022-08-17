const CommentRepository = require("../repositories/comment.repositories");

class CommnetService {
    commentRepository = new CommentRepository();

    findTargetcomment = async (productId) => {
    const targetCommnetdata = this.commentRepository.findAllcomments(productId);
    return targetCommnetdata;
  };
}


module.exports = CommnetService;
