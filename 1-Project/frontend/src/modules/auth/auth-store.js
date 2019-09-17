import service from '@/modules/auth/auth-service';
import Message from '@/shared/message/message';
import { i18n } from '@/i18n';
import Errors from '@/shared/error/errors';
import { routerAsync } from '@/app-module';
import ProgressBar from '@/shared/progress-bar/progress-bar';
import { AuthToken } from '@/modules/auth/auth-token';

export default {
  namespaced: true,

  state: {
    currentUser: null,
    loadingInit: true,
    loadingEmailConfirmation: false,
    loadingPasswordResetEmail: false,
    loadingVerifyEmail: false,
    loadingPasswordReset: false,
    loadingUpdateProfile: false,
    loading: false,
  },

  getters: {
    currentUser: (state) => state.currentUser,
    currentUserEmail: (state, getters) =>
      getters.currentUser
        ? getters.currentUser.email
        : null,
    currentUserFullName: (state, getters) =>
      getters.currentUser
        ? getters.currentUser.fullName
        : '',

    signedIn: (state, getters) =>
      !!getters.currentUser && !!getters.currentUser.id,

    roles: (state, getters) =>
      getters.currentUser
        ? getters.currentUser.roles || []
        : [],

    emptyPermissions: (state, getters) =>
      !getters.roles || !getters.roles.length,

    loading: (state) => !!state.loading,

    loadingInit: (state) => !!state.loadingInit,

    loadingEmailConfirmation: (state) =>
      !!state.loadingEmailConfirmation,

    loadingPasswordResetEmail: (state) =>
      !!state.loadingPasswordResetEmail,

    loadingPasswordReset: (state) =>
      !!state.loadingPasswordReset,

    loadingVerifyEmail: (state) =>
      !!state.loadingVerifyEmail,

    loadingUpdateProfile: (state) =>
      !!state.loadingUpdateProfile,

    currentUserNameOrEmailPrefix: (state, getters) => {
      if (!getters.currentUser) {
        return null;
      }

      if (
        getters.currentUserFullName &&
        getters.currentUserFullName.length < 25
      ) {
        return getters.currentUserFullName;
      }

      if (getters.currentUser.firstName) {
        return getters.currentUser.firstName;
      }

      return getters.currentUser.email.split('@')[0];
    },

    currentUserAvatar: (state, getters) => {
      if (
        !getters.currentUser ||
        !getters.currentUser.avatars ||
        !getters.currentUser.avatars.length ||
        !getters.currentUser.avatars[0].publicUrl
      ) {
        return null;
      }

      return getters.currentUser.avatars[0].publicUrl;
    },
  },

  mutations: {
    CURRENT_USER_REFRESH_SUCCESS(state, payload) {
      state.currentUser = payload.currentUser || null;
    },

    AUTH_START(state) {
      state.loading = true;
    },

    AUTH_SUCCESS(state, payload) {
      state.currentUser = payload.currentUser || null;
      state.loading = false;
    },

    AUTH_ERROR(state) {
      state.currentUser = null;
      state.loading = false;
    },

    EMAIL_CONFIRMATION_START(state) {
      state.loadingEmailConfirmation = true;
    },

    EMAIL_CONFIRMATION_SUCCESS(state) {
      state.loadingEmailConfirmation = false;
    },

    EMAIL_CONFIRMATION_ERROR(state) {
      state.loadingEmailConfirmation = false;
    },

    EMAIL_VERIFY_START(state) {
      state.loadingVerifyEmail = true;
    },

    EMAIL_VERIFY_SUCCESS(state) {
      state.loadingVerifyEmail = false;
    },

    EMAIL_VERIFY_ERROR(state) {
      state.loadingVerifyEmail = false;
    },

    PASSWORD_RESET_START(state) {
      state.loadingPasswordReset = true;
    },

    PASSWORD_RESET_SUCCESS(state) {
      state.loadingPasswordReset = false;
    },

    PASSWORD_RESET_ERROR(state) {
      state.loadingPasswordReset = false;
    },

    PASSWORD_RESET_EMAIL_START(state) {
      state.loadingPasswordResetEmail = true;
    },

    PASSWORD_RESET_EMAIL_SUCCESS(state) {
      state.loadingPasswordResetEmail = false;
    },

    PASSWORD_RESET_EMAIL_ERROR(state) {
      state.loadingPasswordResetEmail = false;
    },

    UPDATE_PROFILE_START(state) {
      state.loadingUpdateProfile = true;
    },

    UPDATE_PROFILE_SUCCESS(state) {
      state.loadingUpdateProfile = false;
    },

    UPDATE_PROFILE_ERROR(state) {
      state.loadingUpdateProfile = false;
    },

    AUTH_INIT_SUCCESS(state, payload) {
      state.currentUser = payload.currentUser || null;
      state.loadingInit = false;
    },

    AUTH_INIT_ERROR(state) {
      state.currentUser = null;
      state.loadingInit = false;
    },
  },

  actions: {
    async doInit({ commit, dispatch }) {
      try {
        const token = await AuthToken.get();
        let currentUser = null;

        if (token) {
          currentUser = await service.fetchMe();
        }

        commit('AUTH_INIT_SUCCESS', { currentUser });
        ProgressBar.done();
      } catch (error) {
        console.error(error);
        commit('AUTH_INIT_ERROR');
        await dispatch('doSignout');
        ProgressBar.done();
      }
    },

    async doWaitUntilInit({ getters }) {
      if (!getters.loadingInit) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        const waitUntilInitInterval = setInterval(() => {
          if (!getters.loadingInit) {
            clearInterval(waitUntilInitInterval);
            resolve();
          }
        }, 500);
      });
    },

    async doSendEmailConfirmation({ commit }) {
      try {
        commit('EMAIL_CONFIRMATION_START');

        await service.sendEmailVerification();

        Message.success(
          i18n('auth.verificationEmailSuccess'),
        );

        commit('EMAIL_CONFIRMATION_SUCCESS');
      } catch (error) {
        Errors.handle(error);
        commit('EMAIL_CONFIRMATION_ERROR');
      }
    },

    async doSendPasswordResetEmail({ commit }, email) {
      try {
        commit('PASSWORD_RESET_EMAIL_START');
        await service.sendPasswordResetEmail(email);
        Message.success(
          i18n('auth.passwordResetEmailSuccess'),
        );
        commit('PASSWORD_RESET_EMAIL_SUCCESS');
      } catch (error) {
        Errors.handle(error);
        commit('PASSWORD_RESET_EMAIL_ERROR');
      }
    },

    async doRegisterEmailAndPassword(
      { commit },
      { email, password },
    ) {
      try {
        commit('AUTH_START');

        const token = await service.registerWithEmailAndPassword(
          email,
          password,
        );

        AuthToken.set(token, true);

        const currentUser = await service.fetchMe();

        commit('AUTH_SUCCESS', {
          currentUser,
        });

        routerAsync().push('/');
      } catch (error) {
        await service.signout();
        Errors.handle(error);
        commit('AUTH_ERROR');
      }
    },

    async doSigninWithEmailAndPassword(
      { commit },
      { email, password, rememberMe },
    ) {
      try {
        commit('AUTH_START');

        let currentUser = null;

        const token = await service.signinWithEmailAndPassword(
          email,
          password,
          rememberMe,
        );

        AuthToken.set(token, rememberMe);
        currentUser = await service.fetchMe();

        commit('AUTH_SUCCESS', {
          currentUser,
        });

        routerAsync().push('/');
      } catch (error) {
        await service.signout();
        Errors.handle(error);
        commit('AUTH_ERROR');
      }
    },

    async doSignout({ commit }) {
      try {
        commit('AUTH_START');
        await service.signout();

        commit('AUTH_SUCCESS', {
          currentUser: null,
        });

        routerAsync().push('/auth/signin');
      } catch (error) {
        Errors.handle(error);
        commit('AUTH_ERROR');
      }
    },

    async doRefreshCurrentUser({ commit }) {
      try {
        let currentUser = null;
        const token = await AuthToken.get();

        if (token) {
          currentUser = await service.fetchMe();
        }

        commit('CURRENT_USER_REFRESH_SUCCESS', {
          currentUser,
        });
      } catch (error) {
        service.signout();
        Errors.handle(error);

        commit('CURRENT_USER_REFRESH_ERROR', error);
      }
    },

    async doUpdateProfile(
      { commit, dispatch },
      { firstName, lastName, phoneNumber, avatars },
    ) {
      try {
        commit('UPDATE_PROFILE_START');

        await service.updateProfile(
          firstName,
          lastName,
          phoneNumber,
          avatars,
        );

        commit('UPDATE_PROFILE_SUCCESS');
        await dispatch('doRefreshCurrentUser');
        Message.success(i18n('auth.profile.success'));
        routerAsync().push('/');
      } catch (error) {
        Errors.handle(error);
        commit('UPDATE_PROFILE_ERROR');
      }
    },

    async doVerifyEmail({ commit, dispatch }, token) {
      try {
        commit('EMAIL_VERIFY_START');
        await service.verifyEmail(token);
        Message.success(i18n('auth.verifyEmail.success'));
        await dispatch('doRefreshCurrentUser');
        commit('EMAIL_VERIFY_SUCCESS');
        routerAsync().push('/');
      } catch (error) {
        Errors.handle(error);
        commit('EMAIL_VERIFY_ERROR');
        await dispatch('doSignout');
      }
    },

    async doResetPassword(
      { commit, dispatch },
      { token, password },
    ) {
      try {
        commit('PASSWORD_RESET_START');
        await service.passwordReset(token, password);
        Message.success(i18n('auth.passwordResetSuccess'));
        commit('PASSWORD_RESET_SUCCESS');
        routerAsync().push('/');
      } catch (error) {
        Errors.handle(error);
        commit('PASSWORD_RESET_ERROR');
        await dispatch('doSignout');
      }
    },
  },
};
