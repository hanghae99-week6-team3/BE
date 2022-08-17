"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, {
        foreignKey: "productId",
        targetKey: "productId",
        onDelete: "cascade",
      });
    }
  }
  Comment.init(
    {
      commentId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      nickname: {
        require: true,
        type: DataTypes.STRING,
      },
      content: {
        require: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
