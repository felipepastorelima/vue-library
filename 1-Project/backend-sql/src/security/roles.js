class Roles {
  static get values() {
    return {
      owner: 'owner',
      editor: 'editor',
      viewer: 'viewer',
      auditLogViewer: 'auditLogViewer',
      iamSecurityReviewer: 'iamSecurityReviewer',
      entityEditor: 'entityEditor',
      entityViewer: 'entityViewer',
      loanEditor: 'loanEditor',
      loanViewer: 'loanViewer',
      bookEditor: 'bookEditor',
      bookViewer: 'bookViewer',
    };
  }
}

module.exports = Roles;
