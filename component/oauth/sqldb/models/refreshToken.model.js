const properties = require('../property/refreshToken.property');

module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define('RefreshToken', Object
      .assign(properties(DataTypes)), {
    tableName: 'refresh_tokens',
    timestamps: true,
    underscored: true,
    updatedAt: false,
    createdAt: 'created_on',
  });

  RefreshToken.associate = function(db) {
    RefreshToken.belongsTo(db.Client, {
      foreignKey: 'client_id',
    });

    RefreshToken.belongsTo(db.User, {
      foreignKey: 'user_id',
    });
  };

  return RefreshToken;
};
