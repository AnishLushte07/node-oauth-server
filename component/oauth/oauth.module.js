const oauthServer = require('oauth2-server');
const config = require('../../config');

const oauth = new oauthServer({
    model: config.db==='mongo' ? require('./mongo-models.js') : require('./models.js')
});

module.exports = oauth;
