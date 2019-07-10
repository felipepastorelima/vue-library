module.exports = {
  env: "production",

  database: {
    connection: "mongodb://mongo:27017/production",
    transactions: false
  },

  email: {
    comment: "See https://nodemailer.com",
    from: "<insert your email here>",
    host: null,
    auth: {
      user: null,
      pass: null
    }
  },

  graphiql: false,

  clientUrl: "<insert client url here>",

  defaultUser: null,

  uploadDir: "/storage",

  authJwtSecret: "5fda55e7-9000-4c41-9dc0-8fbb094b2202"
};
