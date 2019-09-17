const ForbiddenError = require('../../errors/forbiddenError');

module.exports = (req, res) => {
  try {
    if (!req.currentUser || !req.currentUser.id) {
      throw new ForbiddenError(req.language);
    }

    const payload = req.currentUser;

    res.status(200).send(payload);
  } catch (error) {
    if ([400, 403, 404].includes(error.code)) {
      return res.status(error.code).send(error.message);
    }

    console.error(error);
    return res.status(500).send(error.message);
  }
};
