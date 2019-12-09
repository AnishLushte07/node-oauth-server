const properties = require('../property/authorizationCode.property');

module.exports = (sequelize, DataTypes) => {
  const AuthorizationCode = sequelize.define('AuthorizationCode', Object
      .assign(properties(DataTypes)), {
    tableName: 'authorization_codes',
    timestamps: true,
    underscored: true,
    updatedAt: false,
    createdAt: 'created_on',
  });

  AuthorizationCode.associate = function(db) {
    AuthorizationCode.belongsTo(db.Client, {
      foreignKey: 'client_id',
    });

    AuthorizationCode.belongsTo(db.User, {
      foreignKey: 'user_id',
    });
  };

  return AuthorizationCode;
};
