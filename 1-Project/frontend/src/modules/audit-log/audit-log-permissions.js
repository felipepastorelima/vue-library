import PermissionChecker from '@/modules/iam/permission-checker';
import Permissions from '@/security/permissions';

export class AuditLogPermissions {
  constructor(currentUser) {
    const permissionChecker = new PermissionChecker(
      currentUser,
    );

    this.read = permissionChecker.match(
      Permissions.values.auditLogRead,
    );
  }
}
