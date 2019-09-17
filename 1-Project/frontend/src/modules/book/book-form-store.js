import { BookService } from '@/modules/book/book-service';
import Errors from '@/shared/error/errors';
import { routerAsync } from '@/app-module';
import Message from '@/shared/message/message';
import { i18n } from '@/i18n';

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

    CREATE_STARTED(state) {
      state.saveLoading = true;
    },

    CREATE_SUCCESS(state) {
      state.saveLoading = false;
    },

    CREATE_ERROR(state) {
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

        const record = await BookService.find(id);

        commit('FIND_SUCCESS', record);
      } catch (error) {
        Errors.handle(error);
        commit('FIND_ERROR');
        routerAsync().push('/book');
      }
    },

    async doCreate({ commit }, values) {
      try {
        commit('CREATE_STARTED');
        await BookService.create(values);
        commit('CREATE_SUCCESS');
        Message.success(i18n('entities.book.create.success'));
        routerAsync().push('/book');
      } catch (error) {
        Errors.handle(error);
        commit('CREATE_ERROR');
      }
    },

    async doUpdate({ commit }, { id, values }) {
      try {
        commit('UPDATE_STARTED');

        await BookService.update(id, values);

        commit('UPDATE_SUCCESS');
        Message.success(i18n('entities.book.update.success'));
        routerAsync().push('/book');
      } catch (error) {
        Errors.handle(error);
        commit('UPDATE_ERROR');
      }
    },
  },
};
