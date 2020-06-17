'use strict';
module.exports = (sequelize, DataTypes) => {
  const participents = sequelize.define('participents', {
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  participents.associate = function(models) {
    // associations can be defined here
  };
  return participents;
};