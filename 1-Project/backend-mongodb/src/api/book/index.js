module.exports = (app) => {
  app.post(`/book`, require('./bookCreate'));
  app.put(`/book/:id`, require('./bookUpdate'));
  app.post(`/book/import`, require('./bookImport'));
  app.delete(`/book`, require('./bookDestroy'));
  app.get(
    `/book/autocomplete`,
    require('./bookAutocomplete'),
  );
  app.get(`/book`, require('./bookList'));
  app.get(`/book/:id`, require('./bookFind'));
};
