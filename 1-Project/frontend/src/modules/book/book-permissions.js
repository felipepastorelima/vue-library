import Permissions from '@/security/permissions';
import PermissionChecker from '@/modules/iam/permission-checker';

export class BookPermissions {
  constructor(currentUser) {
    const permissionChecker = new PermissionChecker(
      currentUser,
    );

    this.read = permissionChecker.match(
      Permissions.values.bookRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.bookImport,
    );
    this.bookAutocomplete = permissionChecker.match(
      Permissions.values.bookAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.bookCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.bookEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.bookDestroy,
    );
  }
}
