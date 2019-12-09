const crypto = require('crypto');
const salt = 'anishlushte';
const properties = require('../property/user.property');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', Object
      .assign(properties(DataTypes)), {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    updatedAt: false,
    createdAt: 'created_on',
  });

  User.associate = function(db) {
  };

  User.prototype.verifyPassword = function (password) {
    const hashedPass = crypto
      .createHash('md5')
      .update(salt + password)
      .digest('hex');

    return Promise.resolve(hashedPass === this.password);
  };

  return User;
};
