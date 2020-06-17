"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "users",
      "dob",
      { type: Sequelize.INTEGER },
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "dob", {});
  },
};
