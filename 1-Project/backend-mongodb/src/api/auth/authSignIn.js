const AuthService = require('../../services/auth/authService');

module.exports = async (req, res) => {
  try {
    const payload = await AuthService.signin(
      req.body.email,
      req.body.password,
      req,
    );

    res.status(200).send(payload);
  } catch (error) {
    if ([400, 403, 404].includes(error.code)) {
      return res.status(error.code).send(error.message);
    }

    console.error(error);
    return res.status(500).send(error.message);
  }
};
