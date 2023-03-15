const { user } = require("../models");
const crypto = require("crypto");
const Boom = require("boom");

class SignupRepository {
  findSortUserId = async () => {
    const findOneUser = await user.findOne({ order: [["userId", "DESC"]] });

    return findOneUser;
  };

  findOneUser = async (nickname) => {
    const findOneUser = await user.findOne({
      where: { nickname: nickname },
    });
    return findOneUser;
  };

  createSignup = async (nickname, password, userId) => {
    const createHashedPassword = (password) => {
      crypto.randomBytes(32, (err, buf) => {
        if (err) {
          throw err;
        }
        const salt = buf.toString("base64");
        crypto.pbkdf2(
          password,
          salt,
          1000,
          32,
          "sha512",
          async (err, hashedPassword) => {
            if (err) {
              throw err;
            }
            const pbkdf2Key = hashedPassword.toString("base64");
            const createUser = await user.create({
              nickname,
              hashedPassword: pbkdf2Key,
              salt,
              userId,
            });

            return createUser;
          }
        );
      });
    };
    return createHashedPassword(password);
  };
}

module.exports = SignupRepository;
