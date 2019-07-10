import Errors from '@/shared/error/errors';
import { LoanService } from '@/modules/loan/loan-service';
import Message from '@/shared/message/message';
import { i18n } from '@/i18n';

export default {
  namespaced: true,

  state: {
    loading: false,
  },

  getters: {
    loading: (state) => !!state.loading,
  },

  mutations: {
    EMAIL_ALL_STARTED(state) {
      state.loading = true;
    },

    EMAIL_ALL_SUCCESS(state) {
      state.loading = false;
    },

    EMAIL_ALL_ERROR(state) {
      state.loading = false;
    },
  },

  actions: {
    async doEmailAll({ commit, dispatch }, ids) {
      try {
        commit('EMAIL_ALL_STARTED');

        await LoanService.sendEmails(ids);

        commit('EMAIL_ALL_SUCCESS');

        dispatch(`loan/list/doUnselectAll`, null, {
          root: true,
        });

        Message.success(
          i18n('entities.loan.emailAll.success'),
        );
      } catch (error) {
        Errors.handle(error);
        commit('EMAIL_ALL_ERROR');
      }
    },
  },
};
