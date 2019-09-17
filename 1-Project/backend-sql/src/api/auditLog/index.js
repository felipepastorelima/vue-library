module.exports = (app) => {
  app.get(`/auditLog`, require('./auditLogList'));
};
