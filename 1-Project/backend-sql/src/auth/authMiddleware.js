const config = require('../../config')();
const AuthService = require('../services/auth/authService');

module.exports = async (req, res, next) => {
  req.language = req.headers['accept-language'] || 'en';

  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')) &&
    !(req.cookies && req.cookies.__session)
  ) {
    const defaultUser =
      config.tokens && config.tokens.defaultUser;

    if (defaultUser) {
      try {
        const currentUser = await AuthService.findByEmail(
          defaultUser,
        );

        console.log(
          `Authenticated with default user: ${defaultUser}`,
        );

        if (currentUser && currentUser.disabled) {
          throw new Error(
            `User '${currentUser.email}' is disabled`,
          );
        }

        req.currentUser = currentUser;

        return next();
      } catch (error) {
        console.error(
          `Error while authenticating with default user: ${defaultUser}:`,
          error,
        );

        res.status(403).send('Unauthorized');
        return;
      }
    }

    return next();
  }

  let idToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if (req.cookies) {
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    return next();
  }

  try {
    const currentUser = await AuthService.findByToken(
      idToken,
    );

    if (currentUser && currentUser.disabled) {
      throw new Error(
        `User '${currentUser.email}' is disabled`,
      );
    }

    req.currentUser = currentUser;

    return next();
  } catch (error) {
    console.error('Error while verifying ID token:', error);

    res.status(403).send('Unauthorized');
  }
};
