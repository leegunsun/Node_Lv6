"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.posts, {
        sourceKey: "userId",
        foreignKey: "userId",
      });
      //  this.hasMany(models.posts...) 관계설정 수정한 코드
      // this.belongsTo(models.posts, {
      //   targetKey: "userId",
      //   foreignKey: "userId",
      // });

      this.belongsTo(models.user, {
        targetKey: "userId",
        foreignKey: "userId",
      });
    }
  }
  comments.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      commentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "comments",
    }
  );
  return comments;
};
