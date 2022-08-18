"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Like, {
        foreignKey: "productId",
        sourceKey: "productId",
      });
      this.hasMany(models.Comment, {
        foreignKey: "productId",
        sourceKey: "productId",
      });
    }
  }
  Product.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category: DataTypes.STRING,
      nickname: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      location: DataTypes.STRING,
      img: DataTypes.STRING,
      price: DataTypes.INTEGER,
      commentCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    }
  );
  return Product;
};
