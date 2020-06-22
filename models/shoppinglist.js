"use strict";
module.exports = (sequelize, DataTypes) => {
  const shoppinglist = sequelize.define(
    "shoppinglist",
    {
      category: DataTypes.STRING,
      list: DataTypes.STRING,
      volunteerId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {}
  );
  shoppinglist.associate = function (models) {
    shoppinglist.belongsTo(models.user);

    // associations can be defined here
  };
  return shoppinglist;
};