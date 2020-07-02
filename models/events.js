"use strict";
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define(
    "events",
    {
      title: { type: DataTypes.TEXT, allowNull: false },
      detail: { type: DataTypes.STRING, allowNull: false },
      imageUrl: { type: DataTypes.STRING },
      date: { type: DataTypes.DATE, allowNull: false },
      location: { type: DataTypes.STRING, allowNull: false },
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
