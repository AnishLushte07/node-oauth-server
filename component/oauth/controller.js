const oauthServer = require('oauth2-server');
const Request = oauthServer.Request;
const Response = oauthServer.Response;

const oauth = require('./oauth.module');

module.exports = {
    token,
    authorize,
};

async function token(req, res, next) {
    try {
        const request = new Request(req);
        const response = new Response(res);
        const token = await oauth.token(request, response, {
          requireClientAuthentication: { password: false },
        });

        return res.json(token)
    } catch (err) {
        return next(err);
    }
}

async function authorize(req, res, next) {
    try {
        const request = new Request(req);
        const response = new Response(res);

        const data = await oauth.authorize(request, response);

        return res.json(data);
    } catch (err) {
        return next(err);
    }
}
