const User = require("../models/").user;
const Shopping = require("../models/").shoppinglist;
const { Op } = require("sequelize");

module.exports = {
  getVolunteerEmail: async function () {
    try {
      const volunteers = await User.findAll({
        where: {
          roles: {
            [Op.like]: "%volunteer%",
          },
        },
      });
      const emailID = volunteers.map((t) => {
        //   console.log(t.dataValues.email);
        return (
          //
          t.dataValues.email
        );
      });
      return emailID;
    } catch (e) {
      console.log("ERRROR :", e.message);
      return "Fail";
    }
  },

  checkOpenRequests: async function () {
    try {
      const getShoppingLists = await Shopping.findAll({
        where: {
          status: "open",
        },
      });

      const shoppinglist = getShoppingLists.map((t) => {
        return (
          //
          t.dataValues
        );
      });
      //   console.log("details  ", shoppinglist.length);
      return shoppinglist.length;
    } catch (e) {
      return "Fail";
    }
  },
};
