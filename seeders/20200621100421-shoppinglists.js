"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "shoppinglists",
      [
        {
          category: "groceries",
          list: "tomatoe:3,milk:1,onion:4",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "groceries",
          list: "tomatoe:10,Oatsmilk:2,onion:4",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("shoppinglists", null, {});
  },
};
