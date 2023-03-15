const { comments } = require("../models");

class CommentsRepository {
  // Comment테이블에서 commentId값을 가진 하나의 Comment를 찾는다.
  findOneComment = async (commentId) => {
    const post = await comments.findOne({ where: { commentId: commentId } });

    return post;
  };

  // Comment테이블에서 CommentId의 정렬을 찾는다.
  findSortCommentId = async () => {
    const maxCommentId = await comments.findOne({
      order: [["commentId", "DESC"]],
    });

    return maxCommentId;
  };

  // createdAt을 기준으로 내림차순 정렬한 Comment를 반환한다.
  findComment = async (postId) => {
    const findComment = await comments.findAll({
      where: { postId: postId },
      attributes: [
        "commentId",
        "userId",
        "nickname",
        "comment",
        "createdAt",
        "updatedAt",
      ],
      order: [["createdAt", "DESC"]],
    });

    return findComment;
  };

  // Commet를 생성한다.
  createComment = async (user, userId, postId, commentId, comment) => {
    const addComment = await comments.create({
      comment,
      nickname: user.nickname,
      userId,
      postId,
      commentId: commentId,
    });

    return await addComment;
  };

  // Comment를 수정한다.
  // 에러
  updateComment = async (findComment, comment) => {
    findComment.comment = comment;

    return await findComment.save();
  };

  // Comment를 삭제한다.
  deleteComment = async (commentId) => {
    const deleteOneComment = await comments.destroy({
      where: { commentId: commentId },
    });

    return deleteOneComment;
  };
}

module.exports = CommentsRepository;
