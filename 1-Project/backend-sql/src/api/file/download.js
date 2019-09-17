const config = require('../../../config')();
const path = require('path');

module.exports = (req, res) => {
  const privateUrl = req.query.privateUrl;

  if (!privateUrl) {
    return res.sendStatus(404);
  }

  res.download(path.join(config.uploadDir, privateUrl));
};
