const properties = require('../property/client.property');

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', Object
      .assign(properties(DataTypes)), {
    tableName: 'clients',
    timestamps: true,
    underscored: true,
    updatedAt: false,
    createdAt: 'created_on',
  });

  Client.associate = function(db) {
    // associations can be defined here
  };

  return Client;
};
