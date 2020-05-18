'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Model', {
    authroId: DataTypes.INTEGER,
    isPublic: DataTypes.BOOLEAN,
    model: DataTypes.JSONB
  }, {});
  Model.associate = function(models) {
    // associations can be defined here
  };
  return Model;
};