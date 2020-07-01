"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "shoppinglists",
      "requiredBy",
      { type: Sequelize.DATE },
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("shoppinglists", "requiredBy", {});
  },
};
