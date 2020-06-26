"use strict";
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define(
    "events",
    {
      title: DataTypes.TEXT,
      detail: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      date: DataTypes.DATE,
      location: DataTypes.STRING,
    },
    {}
  );
  events.associate = function (models) {
    events.belongsTo(models.user);
    events.hasMany(models.participents);
    // associations can be defined here
  };
  return events;
};
