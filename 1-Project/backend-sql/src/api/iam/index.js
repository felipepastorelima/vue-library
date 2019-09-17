module.exports = (app) => {
  app.put(`/iam/status`, require('./iamChangeStatus'));
  app.post(`/iam`, require('./iamCreate'));
  app.put(`/iam`, require('./iamEdit'));
  app.post(`/iam/import`, require('./iamImport'));
  app.delete(`/iam`, require('./iamRemove'));
  app.get(`/iam/role`, require('./iamListRoles'));
  app.get(`/iam/user`, require('./iamListUsers'));
  app.get(
    `/iam/user/autocomplete`,
    require('./iamUserAutocomplete'),
  );
  app.get(`/iam/:id`, require('./iamFind'));
};
