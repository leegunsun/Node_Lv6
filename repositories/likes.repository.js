const { likes } = require("../models");

class LikeRepository {
  find = async (userId) => {
    const findLikes = await likes.findAll({ where: { userId: userId } });

    return findLikes;
  };

  findAllPost = async (postId) => {
    const findLikes = await likes.findAll({ where: { postId: postId } });

    return findLikes;
  };

  findPostUserCheck = async (userId, postId) => {
    const findLikes = await likes.findOne({
      where: { postId: postId, userId: userId },
    });

    return findLikes;
  };

  addLike = async (postId, userId) => {
    const addLike = await likes.create({ postId: postId, userId: userId });

    return await addLike.save();
  };

  deleteLike = async (postId, userId) => {
    const deleteLike = await likes.destroy({
      where: { postId: postId, userId: userId },
    });

    return deleteLike;
  };

  findOnePost = async (postId) => {
    const findLikes = await likes.findOne({ where: { postId: postId } });

    return findLikes;
  };
}

module.exports = LikeRepository;
