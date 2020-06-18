"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      house_num: DataTypes.INTEGER,
      street: DataTypes.STRING,
      postcode: DataTypes.STRING,
      city: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {}
  );
  user.associate = function (models) {
    user.hasMany(models.events);
    user.hasOne(models.shoppinglists);

    // associations can be defined here
  };
  return user;
};
