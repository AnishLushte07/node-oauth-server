const properties = require('../property/accessToken.property');

module.exports = (sequelize, DataTypes) => {
  const AccessToken = sequelize.define('AccessToken', Object
      .assign(properties(DataTypes)), {
    tableName: 'access_tokens',
    timestamps: true,
    underscored: true,
    updatedAt: false,
    createdAt: 'created_on',
  });

  AccessToken.associate = function(db) {
    AccessToken.belongsTo(db.Client, {
      foreignKey: 'client_id',
    });

    AccessToken.belongsTo(db.User, {
      foreignKey: 'user_id',
    });
  };

  return AccessToken;
};
