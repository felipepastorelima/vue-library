import Permissions from '@/security/permissions';
import PermissionChecker from '@/modules/iam/permission-checker';

export class LoanPermissions {
  constructor(currentUser) {
    const permissionChecker = new PermissionChecker(
      currentUser,
    );

    this.read = permissionChecker.match(
      Permissions.values.loanRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.loanImport,
    );
    this.loanAutocomplete = permissionChecker.match(
      Permissions.values.loanAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.loanCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.loanEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.loanDestroy,
    );
  }
}
