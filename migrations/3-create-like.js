"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Likes", {
      likeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      likeCount: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.TEXT,
        get:function(){
          return JSON.parse(this.getDataValue("userId"));
        },
        set:function(value){
          return this.setDataValue("userId", value);
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Likes");
  },
};

// Like 테이블에 productId 필드를 생성합니다.
// await queryInterface.addColumn("Likes", "productId", {
//   type: Sequelize.INTEGER,
//   references: {
//     model: "Products", // Users 모델에서
//     key: "productId", // 그 아이디 값을 참고합니다.
//   },
//   onDelete: "CASCADE",
// });
// await queryInterface.removeColumn(
//   "Products", // name of Source model
//   "productId" // key we want to remove
// );
