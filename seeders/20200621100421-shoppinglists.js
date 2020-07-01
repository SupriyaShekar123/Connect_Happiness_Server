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
          requiredBy: "2020-07-01T08:00:00.000Z",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "groceries",
          list: "tomatoe:10,Oatsmilk:2,onion:4",
          userId: 3,
          requiredBy: "2020-07-04T08:00:00.000Z",
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
