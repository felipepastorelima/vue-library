const EmailSender = require('../../services/shared/email/emailSender');

module.exports = (req, res) => {
  try {
    const payload = EmailSender.isConfigured;

    res.status(200).send(payload);
  } catch (error) {
    if ([400, 403, 404].includes(error.code)) {
      return res.status(error.code).send(error.message);
    }

    console.error(error);
    return res.status(500).send(error.message);
  }
};
