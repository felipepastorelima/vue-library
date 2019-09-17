import Errors from '@/shared/error/errors';
import { routerAsync } from '@/app-module';
import Message from '@/shared/message/message';
import { i18n } from '@/i18n';
import { IamService } from '@/modules/iam/iam-service';

export default {
  namespaced: true,

  state: {
    findLoading: false,
    saveLoading: false,
    record: null,
  },

  getters: {
    record: (state) => state.record,
    findLoading: (state) => !!state.findLoading,
    saveLoading: (state) => !!state.saveLoading,
  },

  mutations: {
    RESET(state) {
      state.findLoading = false;
      state.saveLoading = false;
      state.record = null;
    },

    FIND_STARTED(state) {
      state.record = null;
      state.findLoading = true;
    },

    FIND_SUCCESS(state, payload) {
      state.record = payload;
      state.findLoading = false;
    },

    FIND_ERROR(state) {
      state.record = null;
      state.findLoading = false;
    },

    ADD_STARTED(state) {
      state.saveLoading = true;
    },

    ADD_SUCCESS(state) {
      state.saveLoading = false;
    },

    ADD_ERROR(state) {
      state.saveLoading = false;
    },

    UPDATE_STARTED(state) {
      state.saveLoading = true;
    },

    UPDATE_SUCCESS(state) {
      state.saveLoading = false;
    },

    UPDATE_ERROR(state) {
      state.saveLoading = false;
    },
  },

  actions: {
    doNew({ commit }) {
      commit('RESET');
    },

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

    async doAdd({ commit }, values) {
      try {
        commit('ADD_STARTED');
        await IamService.create(values);
        commit('ADD_SUCCESS');
        Message.success(i18n('iam.doAddSuccess'));
        routerAsync().push('/iam');
      } catch (error) {
        Errors.handle(error);
        commit('ADD_ERROR');
      }
    },

    async doUpdate(
      { commit, rootGetters, dispatch },
      values,
    ) {
      try {
        commit('UPDATE_STARTED');
        await IamService.edit(values);
        commit('UPDATE_SUCCESS');

        const currentUser = rootGetters['auth/currentUser'];

        if (currentUser.id === values.id) {
          dispatch('auth/doRefreshCurrentUser');
        }

        Message.success(i18n('iam.doUpdateSuccess'));

        routerAsync().push('/iam');
      } catch (error) {
        Errors.handle(error);
        commit('UPDATE_ERROR');
      }
    },
  },
};
