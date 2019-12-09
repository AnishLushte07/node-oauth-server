const controller = require('./controller');

module.exports = function(app){
    app.all('/oauth/token', controller.token);

    app.post('/authorize', controller.authorize);
};
