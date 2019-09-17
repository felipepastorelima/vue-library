const AuthService = require('../../services/auth/authService');

module.exports = async (req, res) => {
  try {
    await AuthService.sendPasswordResetEmail(
      req.language,
      req.body.email,
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
