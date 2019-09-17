const assert = require('assert');
const ForbiddenError = require('../../errors/forbiddenError');
const Permissions = require('../../security/permissions');

module.exports = class PermissionChecker {
  constructor({ language, currentUser }) {
    this.language = language;
    this.currentUser = currentUser;
  }

  validateHas(permission) {
    if (!this.has(permission)) {
      throw new ForbiddenError(this.language);
    }
  }

  has(permission) {
    assert(permission, 'permission is required');

    return this.currentUserRolesIds.some((role) =>
      permission.allowedRoles.some(
        (allowedRole) => allowedRole === role,
      ),
    );
  }

  validateHasStorageFolder(folder) {
    if (!this.hasStorageFolder(folder)) {
      throw new ForbiddenError(this.language);
    }
  }

  hasStorageFolder(folder) {
    assert(folder, 'Folder is required');
    return this.allowedStorageFolders().includes(folder);
  }

  get currentUserRolesIds() {
    if (!this.currentUser || !this.currentUser.roles) {
      return [];
    }

    return this.currentUser.roles;
  }

  allowedStorageFolders() {
    let allowedStorageFolders = [];

    Permissions.asArray.forEach((permission) => {
      if (this.has(permission)) {
        allowedStorageFolders = allowedStorageFolders.concat(
          permission.allowedStorageFolders || [],
        );
      }
    });

    return [...new Set(allowedStorageFolders)];
  }
};
