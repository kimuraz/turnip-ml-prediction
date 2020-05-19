'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'Model',
    {
      name: DataTypes.STRING,
      authorId: DataTypes.INTEGER,
      model: DataTypes.JSONB,
      isPublic: DataTypes.BOOLEAN
    },
    {}
  );
  Model.associate = function(models) {
    // associations can be defined here
    Model.belongsTo(models.User, {
      foreignKey: 'authorId',
      onDelete: 'cascade'
    });
  };
  return Model;
};
