const AuthProfileEditor = require('../../services/auth/authProfileEditor');
const ForbiddenError = require('../../errors/forbiddenError');

module.exports = async (req, res) => {
  try {
    if (!req.currentUser || !req.currentUser.id) {
      throw new ForbiddenError(req.language);
    }

    let editor = new AuthProfileEditor(
      req.currentUser,
      req.language,
    );

    await editor.execute(req.body.profile);

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
