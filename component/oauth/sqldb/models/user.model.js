const properties = require('../property/user.property');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', Object
      .assign(properties(DataTypes)), {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    paranoid: true,
    updatedAt: 'updated_on',
    createdAt: 'created_on',
    deletedAt: 'deleted_on',
  });

  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};
