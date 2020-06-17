"use strict";
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define(
    "events",
    {
      title: DataTypes.STRING,
      detail: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      date: DataTypes.INTEGER,
      location: DataTypes.STRING,
    },
    {}
  );
  events.associate = function (models) {
    events.belongsTo(models.user);
    // associations can be defined here
  };
  return events;
};
