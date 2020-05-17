'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dataset = sequelize.define('Dataset', {
    authorId: DataTypes.INTEGER,
    isPublic: DataTypes.BOOLEAN,
    dataset: DataTypes.JSONB
  }, {});
  Dataset.associate = function(models) {
    // associations can be defined here
  };
  return Dataset;
};