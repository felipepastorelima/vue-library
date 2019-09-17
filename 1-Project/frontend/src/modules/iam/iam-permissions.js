import PermissionChecker from '@/modules/iam/permission-checker';
import Permissions from '@/security/permissions';

export class IamPermissions {
  constructor(currentUser) {
    const permissionChecker = new PermissionChecker(
      currentUser,
    );

    this.read = permissionChecker.match(
      Permissions.values.iamRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.iamImport,
    );
    this.userAutocomplete = permissionChecker.match(
      Permissions.values.iamUserAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.iamCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.iamEdit,
    );
  }
}
