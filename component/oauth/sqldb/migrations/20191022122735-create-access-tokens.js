const {
  engine, timestamps, properties,
} = require('../helper.js');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('access_tokens', Object.assign({},
        properties('accessToken', Sequelize),
        timestamps(['c'], Sequelize),
    ), engine);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('access_tokens');
  },
};
