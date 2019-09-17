const IamEditor = require('../../services/iam/iamEditor');
const PermissionChecker = require('../../services/iam/permissionChecker');
const permissions = require('../../security/permissions')
  .values;

module.exports = async (req, res) => {
  try {
    new PermissionChecker(req).validateHas(
      permissions.iamEdit,
    );

    let editor = new IamEditor(
      req.currentUser,
      req.language,
    );

    await editor.update(req.body.data);

    const payload = true;

    res.status(200).send(payload);
  } catch (error) {
    if ([400, 403, 404].includes(error.code)) {
      return res.status(error.code).send(error.message);
    }

    console.error(error);
    return res.status(500).send(error.message);
  }
};
