"use strict";
module.exports = (sequelize, DataTypes) => {
  const participents = sequelize.define(
    "participents",
    {
      eventId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  participents.associate = function (models) {
    participents.belongsTo(models.events);
    //participents.belongsTo(models.user);

    // associations can be defined here
  };
  return participents;
};
