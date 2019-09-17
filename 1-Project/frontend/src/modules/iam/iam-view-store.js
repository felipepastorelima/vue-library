import Errors from '@/shared/error/errors';
import { routerAsync } from '@/app-module';
import { IamService } from '@/modules/iam/iam-service';
import Message from '@/shared/message/message';
import { i18n } from '@/i18n';

export default {
  namespaced: true,

  state: {
    loading: false,
    record: null,
  },

  getters: {
    record: (state) => state.record,
    loading: (state) => !!state.loading,
  },

  mutations: {
    CHANGE_STATUS_STARTED(state) {
      state.loading = true;
    },

    CHANGE_STATUS_ERROR(state) {
      state.loading = false;
    },

    FIND_STARTED(state) {
      state.record = null;
      state.loading = true;
    },

    FIND_SUCCESS(state, payload) {
      state.record = payload;
      state.loading = false;
    },

    FIND_ERROR(state) {
      state.record = null;
      state.loading = false;
    },
  },

  actions: {
    async doFind({ commit }, id) {
      try {
        commit('FIND_STARTED');
        const record = await IamService.find(id);
        commit('FIND_SUCCESS', record);
      } catch (error) {
        Errors.handle(error);
        commit('FIND_ERROR');
        routerAsync().push('/iam');
      }
    },

    async doToggleStatus({ getters, commit, dispatch }) {
      try {
        const record = getters.record;

        commit('CHANGE_STATUS_STARTED');

        const isEnabling = !!record.disabled;

        if (isEnabling) {
          await IamService.enable([record.id]);
        } else {
          await IamService.disable([record.id]);
        }

        if (isEnabling) {
          Message.success(i18n('iam.doEnableSuccess'));
        } else {
          Message.success(i18n('iam.doDisableSuccess'));
        }

        dispatch('doFind', record.id);
      } catch (error) {
        Errors.handle(error);
        commit('CHANGE_STATUS_ERROR');
      }
    },
  },
};
