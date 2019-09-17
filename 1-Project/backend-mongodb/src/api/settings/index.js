module.exports = (app) => {
  app.put(`/settings`, require('./settingsSave'));
  app.get(`/settings`, require('./settingsFind'));
};
