const SettingsService = require('../../services/settingsService');

module.exports = async (req, res) => {
  try {
    const payload = await SettingsService.findOrCreateDefault(
      req.currentUser,
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
