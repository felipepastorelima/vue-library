const PermissionChecker = require('../../services/iam/permissionChecker');
const permissions = require('../../security/permissions')
  .values;
const UserRepository = require('../../database/repositories/userRepository');

module.exports = async (req, res) => {
  try {
    new PermissionChecker(req).validateHas(
      permissions.iamUserAutocomplete,
    );

    const payload = await UserRepository.findAllAutocomplete(
      req.query.query,
      req.query.limit,
    );

    res.status(200).send(payload);
  } catch (error) {
    if ([400, 403, 404].includes(error.code)) {
      return res.status(error.code).send(error.message);
    }

    console.error(error);
    return res.status(500).send(error.message);
  }
};
