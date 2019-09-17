module.exports = function get() {
  const isMigration = !!process.env.MIGRATION_ENV;

  if (isMigration) {
    const config = require(`./${
      process.env.MIGRATION_ENV
    }`);

    return config;
  }

  return require(`./${process.env.NODE_ENV}`);
};
