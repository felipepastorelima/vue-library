const os = require('os');

module.exports = {
  env: 'localhost',

  database: {
    // connection:
    //   'mongodb://localhost:27017,localhost:27018,localhost:27019/development?replicaSet=rs',
    // transactions: true,
    connection: 'mongodb://localhost:27017/development',
    transactions: false,
  },

  email: {
    comment: 'See https://nodemailer.com',
    from: '<insert your email here>',
    host: null,
    auth: {
      user: null,
      pass: null,
    },
  },

  clientUrl: 'http://localhost:8081',

  defaultUser: '<insert your email here>',

  uploadDir: os.tmpdir(),

  authJwtSecret: '5fda55e7-9000-4c41-9dc0-8fbb094b2202',
};
