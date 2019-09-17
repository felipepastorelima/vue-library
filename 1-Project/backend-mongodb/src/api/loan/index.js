module.exports = (app) => {
  app.post(`/loan`, require('./loanCreate'));
  app.put(`/loan/:id`, require('./loanUpdate'));
  app.post(`/loan/import`, require('./loanImport'));
  app.delete(`/loan`, require('./loanDestroy'));
  app.get(
    `/loan/autocomplete`,
    require('./loanAutocomplete'),
  );
  app.get(`/loan`, require('./loanList'));
  app.get(`/loan/:id`, require('./loanFind'));
};
