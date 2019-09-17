import { LoanService } from '@/modules/loan/loan-service';
import Errors from '@/shared/error/errors';
import { routerAsync } from '@/app-module';
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
    DESTROY_ALL_STARTED(state) {
      state.loading = true;
    },

    DESTROY_ALL_SUCCESS(state) {
      state.loading = false;
    },

    DESTROY_ALL_ERROR(state) {
      state.loading = false;
    },

    DESTROY_STARTED(state) {
      state.loading = true;
    },

    DESTROY_SUCCESS(state) {
      state.loading = false;
    },

    DESTROY_ERROR(state) {
      state.loading = false;
    },
  },

  actions: {
    async doDestroy({ commit, dispatch, rootGetters }, id) {
      try {
        commit('DESTROY_STARTED');

        await LoanService.destroyAll([id]);

        commit('DESTROY_SUCCESS');

        Message.success(i18n('entities.loan.destroy.success'));

        routerAsync().push('/loan');

        dispatch(
          `${'loan/list'}/doFetch`,
          rootGetters[`${'loan/list'}/filter`],
          {
            root: true,
          },
        );
      } catch (error) {
        Errors.handle(error);
        commit('DESTROY_ERROR');
      }
    },

    async doDestroyAll(
      { commit, dispatch, rootGetters },
      ids,
    ) {
      try {
        commit('DESTROY_ALL_STARTED');

        await LoanService.destroyAll(ids);

        commit('DESTROY_ALL_SUCCESS');

        dispatch(`${'loan/list'}/doUnselectAll`, null, {
          root: true,
        });

        Message.success(
          i18n('entities.loan.destroyAll.success'),
        );

        routerAsync().push('/loan');

        dispatch(
          `${'loan/list'}/doFetch`,
          rootGetters[`${'loan/list'}/filter`],
          {
            root: true,
          },
        );
      } catch (error) {
        Errors.handle(error);
        commit('DESTROY_ALL_ERROR');
      }
    },
  },
};
