const ForbiddenError = require('../../errors/forbiddenError');
const AuthService = require('../../services/auth/authService');

module.exports = async (req, res) => {
  try {
    if (!req.currentUser) {
      throw new ForbiddenError(req.language);
    }

    await AuthService.sendEmailAddressVerificationEmail(
      req.language,
      req.currentUser.email,
    );

    const payload = true;

    res.status(200).send(payload);
  } catch (error) {
    if ([400, 403, 404].includes(error.code)) {
      return res.status(error.code).send(error.message);
    }

    console.error(error);
    return res.status(500).send(error.message);
  }
};
