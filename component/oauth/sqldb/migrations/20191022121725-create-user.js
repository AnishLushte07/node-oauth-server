const {
  engine, timestamps, properties,
} = require('../helper.js');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', Object.assign({},
        properties('user', Sequelize),
        timestamps(['c', 'u', 'd'], Sequelize),
    ), engine);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('users');
  },
};
