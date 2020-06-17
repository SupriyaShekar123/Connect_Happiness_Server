"use strict";
module.exports = (sequelize, DataTypes) => {
  const shoppinglists = sequelize.define(
    "shoppinglists",
    {
      groceries: DataTypes.STRING,
      medicines: DataTypes.STRING,
      qty: DataTypes.INTEGER,
    },
    {}
  );
  shoppinglists.associate = function (models) {
    shoppinglists.belongsTo(models.user);
    // associations can be defined here
  };
  return shoppinglists;
};
