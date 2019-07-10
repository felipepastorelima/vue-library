module.exports = {
  env: 'production',

  database: {
    username: 'postgres',
    dialect: 'postgres',
    password: '',
    database: 'postgres',
    host: 'postgres',
    logging: console.log,
    operatorsAliases: false,
  },

  // database: {
  //   username: 'root',
  //   dialect: 'mysql',
  //   password: '',
  //   database: 'production',
  //   host:
  //     '<insert public ip here>',
  //   logging: console.log,
  //   operatorsAliases: false,
  // },

  email: {
    comment: 'See https://nodemailer.com',
    from: '<insert your email here>',
    host: null,
    auth: {
      user: null,
      pass: null,
    },
  },

  clientUrl: '<insert client url here>',

  defaultUser: null,

  uploadDir: '/storage',

  authJwtSecret: '5fda55e7-9000-4c41-9dc0-8fbb094b2202',
};
