"use strict";
module.exports = (sequelize, DataTypes) => {
  const shoppinglist = sequelize.define(
    "shoppinglist",
    {
      category: { type: DataTypes.STRING, allowNull: false },
      list: { type: DataTypes.STRING, allowNull: false },
      volunteerId: DataTypes.INTEGER,
      status: {
        type: DataTypes.STRING,
        defaultValue: "open",
      },
      requiredBy: {
        type: DataType.DATE,
        allowNull: false,
      },
    },
    {}
  );
  shoppinglist.associate = function (models) {
    shoppinglist.belongsTo(models.user);

    // associations can be defined here
  };
  return shoppinglist;
};
