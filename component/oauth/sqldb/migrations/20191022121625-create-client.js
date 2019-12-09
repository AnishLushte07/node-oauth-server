const {
  engine, timestamps, properties,
} = require('../helper.js');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('clients', Object.assign({},
        properties('client', Sequelize),
        timestamps(['c'], Sequelize),
    ), engine);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('clients');
  },
};
