const Roles = require('./roles');
const roles = Roles.values;

class Permissions {
  static get values() {
    return {
      iamEdit: {
        id: 'iamEdit',
        allowedRoles: [roles.librarian],
        allowedStorageFolders: ['user'],
      },
      iamCreate: {
        id: 'iamCreate',
        allowedRoles: [roles.librarian],
      },
      iamImport: {
        id: 'iamImport',
        allowedRoles: [roles.librarian],
      },
      iamRead: {
        id: 'iamRead',
        allowedRoles: [roles.librarian],
      },
      iamUserAutocomplete: {
        id: 'iamUserAutocomplete',
        allowedRoles: [roles.librarian],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.librarian],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.librarian],
      },
      loanEmail: {
        id: 'loanEmail',
        allowedRoles: [roles.librarian],
      },
      loanImport: {
        id: 'loanImport',
        allowedRoles: [roles.librarian],
      },
      loanCreate: {
        id: 'loanCreate',
        allowedRoles: [roles.librarian],
        allowedStorageFolders: ['loan'],
      },
      loanEdit: {
        id: 'loanEdit',
        allowedRoles: [roles.librarian],
        allowedStorageFolders: ['loan'],
      },
      loanDestroy: {
        id: 'loanDestroy',
        allowedRoles: [roles.librarian],
        allowedStorageFolders: ['loan'],
      },
      loanRead: {
        id: 'loanRead',
        allowedRoles: [roles.librarian, roles.member],
      },
      loanAutocomplete: {
        id: 'loanAutocomplete',
        allowedRoles: [roles.librarian],
      },

      bookImport: {
        id: 'bookImport',
        allowedRoles: [roles.librarian],
      },
      bookCreate: {
        id: 'bookCreate',
        allowedRoles: [roles.librarian],
        allowedStorageFolders: ['book'],
      },
      bookEdit: {
        id: 'bookEdit',
        allowedRoles: [roles.librarian],
        allowedStorageFolders: ['book'],
      },
      bookDestroy: {
        id: 'bookDestroy',
        allowedRoles: [roles.librarian],
        allowedStorageFolders: ['book'],
      },
      bookRead: {
        id: 'bookRead',
        allowedRoles: [roles.librarian, roles.member],
      },
      bookAutocomplete: {
        id: 'bookAutocomplete',
        allowedRoles: [roles.librarian, roles.member],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

module.exports = Permissions;
