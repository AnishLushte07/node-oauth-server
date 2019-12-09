const {
  engine, timestamps, properties,
} = require('../helper.js');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('authorization_codes', Object.assign({},
        properties('authorizationCode', Sequelize),
        timestamps(['c'], Sequelize),
    ), engine);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('authorization_codes');
  },
};
