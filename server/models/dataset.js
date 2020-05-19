'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dataset = sequelize.define(
    'Dataset',
    {
      authorId: DataTypes.INTEGER,
      dataset: DataTypes.JSONB,
      isPublic: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
    },
    {}
  );
  Dataset.associate = function(models) {
    Dataset.belongsTo(models.User, {
      foreignKey: 'authorId',
      onDelete: 'cascade'
    });
  };
  return Dataset;
};
