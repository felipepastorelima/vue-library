module.exports = (app) => {
  const upload = require('./upload');
  upload.mapAllUploadRequests(app);

  app.get(`/download`, require('./download'));
};
