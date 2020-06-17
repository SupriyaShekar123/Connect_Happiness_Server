"use strict";
module.exports = (sequelize, DataTypes) => {
  const userRoles = sequelize.define(
    "userRoles",
    {
      roles: DataTypes.STRING,
    },
    {}
  );
  userRoles.associate = function (models) {
    userRoles.belongs(models.user);
    // associations can be defined here
  };
  return userRoles;
};
