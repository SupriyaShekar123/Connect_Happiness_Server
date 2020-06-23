"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          name: "John",

          email: "Drishika4u@gmail.com",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
          house_num: 39,
          street: "Bertha von sutterlaan",
          postcode: "1187 SR",
          city: "Amstelveen",
          phone: 1234,
          dob: "1998-10-05",
          roles: "general",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mark",

          email: "giridhar97@gmail.com",
          password: bcrypt.hashSync("dummy@1234", SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
          house_num: 48,
          street: "Roselaan",
          postcode: "1188 SE",
          city: "Amstelveen",
          phone: 12345,
          dob: "1950-1-15",
          roles: "seniorCitizen",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Michal",

          email: "Drishika4u@gmail.com",
          password: bcrypt.hashSync("michale1234", SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
          house_num: 4,
          street: "Aleta Jacoblaan",
          postcode: "1182 MR",
          city: "Amstelveen",
          phone: 12346,
          dob: "1955-10-05",
          roles: "seniorCitizen",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Rose",

          email: "s.supriya82@gmail.com",
          password: bcrypt.hashSync("rose1234", SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
          house_num: 3,
          street: "Spigel van laan",
          postcode: "1185 ME",
          city: "Amstelveen",
          phone: 12346,
          dob: "1981-11-06",
          roles: "volunteer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Smitha",

          email: "karthikshekar963@gmail.com",
          password: bcrypt.hashSync("test12345", SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
          house_num: 39,
          street: "Bertha von sutterlaan",
          postcode: "1187 SR",
          city: "Amstelveen",
          phone: 1234,
          dob: "1990-10-05",
          roles: "volunteer",
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
