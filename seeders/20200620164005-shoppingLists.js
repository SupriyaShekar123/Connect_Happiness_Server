"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "shoppingLists",
      [
        {
          category: "Groceries",
          list: "onion:4,milk:1,greentea:1,bread:1",
          userId: 2,
          volunteerId: 1,
          status: "In process",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "Groceries",
          list: "onion:4,milk:1,greentea:1,bread:1,soap:4",
          userId: 3,
          volunteerId: 4,
          status: "In process",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("events", null, {});
  },
};
