const { user } = require("../models");

class AuthRepository {
  findOneUser = async (nickname) => {
    const findOneUser = await user.findOne({ where: { nickname: nickname } });
    return findOneUser;
  };

  findOneUserId = async (userId) => {
    const findOneUser = await user.findOne({
      where: { userId: userId },
    });
    return findOneUser;
  };

  // nickname인 값을 찾아서 리프레쉬 토큰을 업데이트 합니다.
  refreshToken = async (nickname, token) => {
    const UpdaterefreshToken = await user.upsert(
      { refreshToken: token },
      {
        fields: ["refreshToken"],
        where: { nickname: nickname },
        returning: true,
      }
    );

    return UpdaterefreshToken;
  };
}

module.exports = AuthRepository;
