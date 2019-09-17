module.exports = (app) => {
  app.put(
    `/auth/password-reset`,
    require('./authPasswordReset'),
  );

  app.post(
    `/auth/send-email-address-verification-email`,
    require('./authSendEmailAddressVerificationEmail'),
  );

  app.post(
    `/auth/send-password-reset-email`,
    require('./authSendPasswordResetEmail'),
  );

  app.post(`/auth/sign-in`, require('./authSignIn'));

  app.post(`/auth/sign-up`, require('./authSignUp'));

  app.put(`/auth/profile`, require('./authUpdateProfile'));

  app.put(
    `/auth/verify-email`,
    require('./authVerifyEmail'),
  );

  app.get(`/auth/me`, require('./authMe'));

  app.get(
    `/auth/email-configured`,
    require('./authIsEmailConfigured'),
  );
};
