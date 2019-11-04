const url = require('url');

let config = require('../../../config');

function getDBSettings(mysqlUrl) {
    const conn = url.parse(mysqlUrl);
    const [username, password] = conn.auth.split(':');

    const [host, port] = conn.hostname.split(':');

    return {
        database: conn.pathname.slice(1),
        username: username || 'root',
        password: password || '',
        dialect: 'mysql',
        host: host || '127.0.0.1',
        port: port || 3306,
        seederStorage: 'sequelize',
    };
}

module.exports = {
    common: getDBSettings(config.MYSQL),
};
