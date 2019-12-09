const db = require('./sqldb');

module.exports = {
  getAccessToken,
  getRefreshToken,
  getAuthorizationCode,
  getClient,
  getUser,
  saveToken,
  saveAuthorizationCode,
  revokeAuthorizationCode,
};

async function getAccessToken(accessToken) {
  try {
    const token = await db.AccessToken.findOne({
      attributes: ['access_token', 'expires_on'],
      where: {
        access_token: accessToken,
      },
      include: [
        {
        model: db.User,
        attributes: ['id', 'email'],
      }, db.Client]
    });

    return {
      accessToken: token.access_token,
      accessTokenExpiresAt: token.expires_on,
      scope: token.scope,
      client: token.Client,
      user: token.User
    };
  } catch (err) {
    return false;
  }
}

async function getRefreshToken(refreshToken) {
    try {
        const token = await db.RefreshToken.findOne({
            attributes: ['refresh_token', 'expires_on'],
            where: {
                refresh_token: refreshToken,
            },
            include: [{
                model: db.User,
                attributes: ['id', 'email'],
            }, db.Client]
        });

        return {
            refreshToken: token.refresh_token,
            refreshTokenExpiresAt: token.expires_on,
            scope: token.scope,
            client: token.Client,
            user: token.User
        };
    } catch (err) {
      return false;
    }
}

async function getAuthorizationCode(authorizationCode) {
    try {
        const code = await db.AuthorizationCode.findOne({
            attributes: ['authorization_code', 'expires_on'],
            where: {
                authorization_code: authorizationCode,
            },
            include: [{
                model: db.User,
                attributes: ['id', 'email'],
            }, db.Client]
        });

        return {
          authorizationCode: code.authorization_code,
          expiresAt: code.expires_on,
          redirectUri: code.Client.redirect_uri,
          scope: code.scope,
          client: code.Client,
          user: code.User
        };
    } catch (err) {
      return false;
    }
}

async function getClient(clientId, clientSecret) {
    try {
        const options = {
            where: {client_id: clientId},
            attributes: ['id', 'client_id', 'redirect_uri', 'scope', 'authorized_grant_types'],
        };

        if (clientSecret) options.where.client_secret = clientSecret;

        const client = await db.Client.findOne(options);

        if (!client) return false;

        return {
            id: client.id,
            redirectUris: client.redirect_uri.split(','),
            grants: client.authorized_grant_types.split(','),
        };
    } catch (err) {
      return false;
    }
}

async function getUser(username, password) {
    try {
        const user = await db.User.findOne({
            attributes: ['id', 'email', 'first_name', 'password'],
            where: {
                email: username,
            },
        });

        if (!user) return false;

        const validPass = await user.verifyPassword(password);

        return validPass ? { id: user.id } : false;
    } catch (err) {
      return false;
    }
}

async function saveToken(token, client, user) {
    try {
       await Promise.all([
            db.AccessToken.create({
                access_token: token.accessToken,
                expires_on: token.accessTokenExpiresAt,
                // scope: token.scope,
                client_id: client.id,
                user_id: user.id
            }),
            db.RefreshToken.create({
                refresh_token: token.refreshToken,
                expires_on: token.refreshTokenExpiresAt,
                // scope: token.scope,
                client_id: client.id,
                user_id: user.id
            }),
        ]);

        return {
          accessToken: token.accessToken,
          accessTokenExpiresAt: token.accessTokenExpiresAt,
          refreshToken: token.refreshToken,
          // refreshTokenExpiresAt: token.refreshTokenExpiresAt,
          scope: token.scope,
          client: client.id,
          user: user,
        };
    } catch (err) {
      return false;
    }
}

async function saveAuthorizationCode(code, client, user) {
    try {
        await db.AuthorizationCode.create({
            authorization_code: code.authorizationCode,
            expires_on: code.expiresAt,
            // redirect_uri: code.redirectUri,
            // scope: code.scope,
            client_id: client.id,
            user_id: user.id
        });

        return {
            authorizationCode: code.authorizationCode,
            expiresAt: code.expiresAt,
            redirectUri: code.redirectUri,
            scope: code.scope,
            client: client.id,
            user: user,
        };
    } catch (err) {
      return false;
    }
}

async function revokeToken(token) {
    try {
        const refreshToken = await db.RefreshToken.findOne({
            attributes: ['id', 'expires_on'],
            where: {
                refresh_token: token.refreshToken,
            },
        });

        if (!refreshToken) return false;

        refreshToken.update({
            expires_on: new Date(),
        });

        return true;
    } catch (err) {
      return false;
    }
}

async function revokeAuthorizationCode(code) {
    try {
        const authCode = await db.AuthorizationCode.findOne({
          attributes: ['id', 'expires_on'],
          where: {
            authorization_code: code.authorizationCode,
          },
        });

        if (!authCode) return false;

        authCode.update({
            expires_on: new Date(),
        });

        return true;
    } catch (err) {
        return false;
    }
}
