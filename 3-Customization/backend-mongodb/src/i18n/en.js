const en = {
  app: {
    title: 'Library',
  },

  entities: {
    loan: {
      validation: {
        closedLoansSelectedForEmail:
          'Please select only non closed loans to send reminders.',
        returnDateRequired: 'Return Date is required.',
        bookOutOfStock: 'Sorry, this book is out of stock.',
      },
    },
    book: {
      validation: {
        bookOutOfStock:
          'The number of copies is less than the current copies loaned.',
      },
    },
  },

  auth: {
    userDisabled: 'Your account is disabled',
    userNotFound: `Sorry, we don't recognize your credentials`,
    wrongPassword: `Sorry, we don't recognize your credentials`,
    weakPassword: 'This password is too weak',
    emailAlreadyInUse: 'Email is already in use',
    invalidEmail: 'Please provide a valid email',
    passwordReset: {
      invalidToken:
        'Password reset link is invalid or has expired',
      error: `Email not recognized`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'Email verification link is invalid or has expired',
      error: `Email not recognized`,
    },
  },

  iam: {
    errors: {
      userAlreadyExists:
        'User with this email already exists',
      userNotFound: 'User not found',
      disablingHimself: `You can't disable yourself`,
      revokingOwnPermission: `You can't revoke your own librarian permission`,
    },
  },

  importer: {
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
    },
  },

  errors: {
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
  },

  emails: {
    loan: {
      inProgress: {
        subject: `The book {0} should be returned in the next {1} days`,
        body: `
          <p>Hi {3},</p>
          <p>This is just a reminder for you to return the book {1} to the {0} in the next {2} days.</p>
          <p>Thanks,</p>
          <p>Your {0} team</p>
        `,
      },
      overdue: {
        subject: `The return of the book {0} is overdue`,
        body: `
          <p>Hi {2},</p>
          <p>Please return the book {1} to the {0} as soon as possible.</p>
          <p>Thanks,</p>
          <p>Your {0} team</p>
        `,
      },
    },
    invitation: {
      subject: `You've been invited to {0}`,
      body: `
        <p>Hello,</p>
        <p>You've been invited to {0}.</p>
        <p>Follow this link to register.</p>
        <p><a href="{1}">{1}</a></p>
        <p>Thanks,</p>
        <p>Your {0} team</p>
      `,
    },
    emailAddressVerification: {
      subject: `Verify your email for {0}`,
      body: `
        <p>Hello,</p>
        <p>Follow this link to verify your email address.</p>
        <p><a href='{0}'>{0}</a></p>
        <p>If you didn’t ask to verify this address, you can ignore this email.</p>
        <p>Thanks,</p>
        <p>Your {1} team</p>
      `,
    },
    passwordReset: {
      subject: `Reset your password for {0}`,
      body: `
        <p>Hello,</p>
        <p>Follow this link to reset your {0} password for your {1} account.</p>
        <p><a href='{2}'>{2}</a></p>
        <p>If you didn’t ask to reset your password, you can ignore this email.</p>
        <p>Thanks,</p>
        <p>Your {0} team</p>
      `,
    },
  },
};

module.exports = en;
