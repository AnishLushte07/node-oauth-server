const controller = require('./controller');

module.exports = function(app){
    app.all('/oauth/token', controller.token);

    app.post('/authorize', controller.authorize);

    app.get('/authorise', function(req, res) {
        return db.OAuthClient.findOne({
            where: {
                client_id: req.query.client_id,
                redirect_uri: req.query.redirect_uri,
            },
            attributes: ['id', 'name'],
        })
            .then(function(model) {
                if (!model) return res.status(404).json({ error: 'Invalid Client' });
                return res.json(model);
            }).catch(function(err){
                return res.status(err.code || 500).json(err)
            });
    });
}
