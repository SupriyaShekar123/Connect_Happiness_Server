'use strict';
module.exports = (sequelize, DataTypes) => {
  const shoppingLists = sequelize.define('shoppingLists', {
    category: DataTypes.STRING,
    list: DataTypes.STRING,
    volunteerId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  shoppingLists.associate = function(models) {
    // associations can be defined here
  };
  return shoppingLists;
};