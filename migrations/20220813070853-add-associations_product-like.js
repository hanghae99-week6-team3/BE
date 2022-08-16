"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // Like 테이블에 productId 필드를 생성합니다.
    await queryInterface.addColumn("Likes", "productId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Products", // Users 모델에서
        key: "productId", // 그 아이디 값을 참고합니다.
      },
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(
      "Likes", // name of Source model
      "productId" // key we want to remove
    );
  },
};
