'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dataset = sequelize.define('Dataset', {
    author: DataTypes.INTEGER,
    dataset: DataTypes.JSONB
  }, {});
  Dataset.associate = function(models) {
    // associations can be defined here
  };
  return Dataset;
};