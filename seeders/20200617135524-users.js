"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "John",
          lastName: "Smith",
          email: "test@test.com",
          password: "test1234",
          createdAt: new Date(),
          updatedAt: new Date(),
          house_num: 39,
          street: "Bertha von sutterlaan",
          postcode: "1187 SR",
          city: "Amstelveen",
          phone: 1234,
          dob: 10051988,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Mark",
          lastName: "Miller",
          email: "dummy@dummy.com",
          password: "dummy1234",
          createdAt: new Date(),
          updatedAt: new Date(),
          house_num: 48,
          street: "Roselaan",
          postcode: "1188 SE",
          city: "Amstelveen",
          phone: 12345,
          dob: 15061950,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Michal",
          lastName: "Jackson",
          email: "michal@jackson.com",
          password: "michale1234",
          createdAt: new Date(),
          updatedAt: new Date(),
          house_num: 4,
          street: "Aleta Jacoblaan",
          postcode: "1182 MR",
          city: "Amstelveen",
          phone: 12346,
          dob: 4101949,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Rose",
          lastName: "Samuel",
          email: "rose@samuel.com",
          password: "rose1234",
          createdAt: new Date(),
          updatedAt: new Date(),
          house_num: 3,
          street: "Spigel van laan",
          postcode: "1185 ME",
          city: "Amstelveen",
          phone: 12346,
          dob: 19051990,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
