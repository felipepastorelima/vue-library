import { SettingsService } from '@/modules/settings/settings-service';
import Errors from '@/shared/error/errors';
import { routerAsync } from '@/app-module';
import Message from '@/shared/message/message';
import { i18n } from '@/i18n';

export default {
  namespaced: true,

  state: {
    findLoading: false,
    saveLoading: false,
    settings: null,
  },

  getters: {
    settings: (state) => state.settings,
    findLoading: (state) => !!state.findLoading,
    saveLoading: (state) => !!state.saveLoading,
    loanPeriodInDays: (state) =>
      (state.settings && state.settings.loanPeriodInDays) ||
      0,
  },

  mutations: {
    FIND_STARTED(state) {
      state.settings = null;
      state.findLoading = true;
    },

    FIND_SUCCESS(state, payload) {
      state.settings = payload;
      state.findLoading = false;
    },

    FIND_ERROR(state) {
      state.settings = null;
      state.findLoading = false;
    },

    SAVE_STARTED(state) {
      state.saveLoading = true;
    },

    SAVE_SUCCESS(state) {
      state.saveLoading = false;
    },

    SAVE_ERROR(state) {
      state.saveLoading = false;
    },
  },

  actions: {
    async doFind({ commit }) {
      try {
        commit('FIND_STARTED');

        const settings = await SettingsService.find();

        commit('FIND_SUCCESS', settings);
      } catch (error) {
        Errors.handle(error);
        commit('FIND_ERROR');
        routerAsync().push('/');
      }
    },

    async doSave({ commit }, values) {
      try {
        commit('SAVE_STARTED');
        await SettingsService.save(values);
        commit('SAVE_SUCCESS');

        const secondsForReload = 3;

        Message.success(
          i18n('settings.save.success', secondsForReload),
        );

        /**
         * Theme change happens at boot time.
         * So to take effect the page must be reloaded
         */
        setTimeout(
          () => window.location.reload(),
          secondsForReload * 1000,
        );
      } catch (error) {
        Errors.handle(error);
        commit('SAVE_ERROR');
      }
    },
  },
};
