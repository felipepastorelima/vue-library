import PermissionChecker from '@/modules/iam/permission-checker';
import Permissions from '@/security/permissions';

export class SettingsPermissions {
  constructor(currentUser) {
    const permissionChecker = new PermissionChecker(
      currentUser,
    );

    this.edit = permissionChecker.match(
      Permissions.values.settingsEdit,
    );
  }
}
