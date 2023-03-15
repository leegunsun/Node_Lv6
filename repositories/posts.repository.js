const { user, comments, likes, posts } = require("../models");

class PostRepository {
  // Post 스키마로 정의된 모든 포스트를 찾는다
  findAllPosts = async () => {
    const post = await posts.findAll();

    return post;
  };

  // Post 스키마 + likes + comment를 더한 값을 반환한다.
  assemblyPosts = async () => {
    const post = await posts.findAll();
    const rename = await Promise.all(
      post.map(async (ele) => {
        const like = await likes.findAll({ where: { postId: ele.postId } });
        const comment = await comments.findAll({
          where: { postId: ele.postId },
        });
        return {
          postId: ele.postId,
          userId: ele.userId,
          nickname: ele.nickname,
          title: ele.title,
          createdAt: ele.createdAt,
          comment: comment.length ? comment : [],
          likes: like.length ? like.length : 0,
        };
      })
    );

    return rename;
  };

  // Post테이블에서 postId값을 가진 하나의 포스트를 찾는다.
  findOnePost = async (postId) => {
    const post = await posts.findOne({ where: { postId: postId } });

    return post;
  };

  // User테이블에서 하나의 유저를 userId로 찾는다
  findUserId = async (userId) => {
    const userone = await user.findOne({ where: { userId } });

    return userone;
  };

  // Post테이블에서 postId의 정렬을 찾는다.
  findSortPostId = async () => {
    const maxPostId = await posts.findOne({ order: [["postId", "DESC"]] });

    return maxPostId;
  };

  // Post를 생성한다.
  createPost = async (nickname, title, content, userId, postId) => {
    const post = posts.create({
      nickname: nickname.nickname,
      title,
      content,
      userId,
      postId,
    });

    return await post;
  };

  // Post를 수정한다.
  updatePost = async (post, title, content) => {
    //에러

    const updatePost = await posts.update(
      {
        title: title,
        content: content,
      },
      { where: { postId: post.postId } }
    );

    return await updatePost;
  };

  // Post를 삭제한다.
  deletePost = async (postId) => {
    const deleteOnePost = await posts.destroy({ where: { postId: postId } });

    return deleteOnePost;
  };
}

module.exports = PostRepository;
