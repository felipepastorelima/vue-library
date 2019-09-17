import { IamService } from '@/modules/iam/iam-service';
import iamListExporterFields from '@/modules/iam/iam-list-exporter-fields';
import Message from '@/shared/message/message';
import { i18n } from '@/i18n';
import Errors from '@/shared/error/errors';
import Exporter from '@/shared/exporter/exporter';

const INITIAL_PAGE_SIZE = 10;

export default {
  namespaced: true,

  state: {
    rows: [],
    count: 0,
    loading: false,
    filter: {},
    pagination: {},
    sorter: {},

    table: null,
  },

  getters: {
    loading: (state) => state.loading,

    exportLoading: (state) => state.exportLoading,

    rows: (state) => state.rows || [],

    count: (state) => state.count,

    hasRows: (state, getters) => getters.count > 0,

    orderBy: (state) => {
      const sorter = state.sorter;

      if (!sorter) {
        return null;
      }

      if (!sorter.prop) {
        return null;
      }

      let direction =
        sorter.order === 'descending' ? 'DESC' : 'ASC';

      return `${sorter.prop}_${direction}`;
    },

    filter: (state) => state.filter,

    limit: (state) => {
      const pagination = state.pagination;

      if (!pagination || !pagination.pageSize) {
        return INITIAL_PAGE_SIZE;
      }

      return pagination.pageSize;
    },

    offset: (state) => {
      const pagination = state.pagination;

      if (!pagination || !pagination.pageSize) {
        return 0;
      }

      const currentPage = pagination.currentPage || 1;

      return (currentPage - 1) * pagination.pageSize;
    },

    pagination: (state, getters) => {
      return {
        ...state.pagination,
        total: getters.count,
        showSizeChanger: true,
      };
    },

    selectedRows: (state) => {
      return state.table ? state.table.selection : [];
    },
  },

  mutations: {
    RESETED(state) {
      state.rows = [];
      state.count = 0;
      state.loading = false;
      state.filter = {};
      state.pagination = {};
      state.sorter = {};
      if (state.table) {
        state.table.clearSelection();
      }
    },

    UNSELECT_ALL(state) {
      if (state.table) {
        state.table.clearSelection();
      }
    },

    TABLE_MOUNTED(state, payload) {
      state.table = payload;
    },

    PAGINATION_CHANGED(state, payload) {
      state.pagination = payload || {};
    },

    PAGINATION_CURRENT_PAGE_CHANGED(state, payload) {
      const previousPagination = state.pagination || {};

      state.pagination = {
        currentPage: payload || 1,
        pageSize:
          previousPagination.pageSize || INITIAL_PAGE_SIZE,
      };
    },

    PAGINATION_PAGE_SIZE_CHANGED(state, payload) {
      const previousPagination = state.pagination || {};

      state.pagination = {
        currentPage: previousPagination.currentPage || 1,
        pageSize: payload || INITIAL_PAGE_SIZE,
      };
    },

    SORTER_CHANGED(state, payload) {
      state.sorter = payload || {};
    },

    FETCH_STARTED(state, payload) {
      state.loading = true;

      if (state.table) {
        state.table.clearSelection();
      }

      state.filter =
        payload && payload.filter ? payload.filter : {};
      state.pagination =
        payload && payload.keepPagination
          ? state.pagination
          : {};
    },

    FETCH_SUCCESS(state, payload) {
      state.loading = false;
      state.rows = payload.rows;
      state.count = payload.count;
    },

    FETCH_ERROR(state) {
      state.loading = false;
      state.rows = [];
      state.count = 0;
    },

    EXPORT_STARTED(state) {
      state.exportLoading = true;
    },

    EXPORT_SUCCESS(state) {
      state.exportLoading = false;
    },

    EXPORT_ERROR(state) {
      state.exportLoading = false;
    },

    REMOVE_ALL_SELECTED_STARTED(state) {
      state.loading = true;
    },

    REMOVE_ALL_SELECTED_ERROR(state) {
      state.loading = false;
    },

    REMOVE_ALL_SELECTED_SUCCESS(state) {
      if (state.table) {
        state.table.clearSelection();
      }
    },

    CHANGE_STATUS_SELECTED_STARTED(state) {
      state.loading = true;
    },

    CHANGE_STATUS_SELECTED_ERROR(state) {
      state.loading = false;
    },

    CHANGE_STATUS_SELECTED_SUCCESS(state) {
      if (state.table) {
        state.table.clearSelection();
      }
    },
  },

  actions: {
    doUnselectAll({ commit }) {
      commit('UNSELECT_ALL');
    },

    doMountTable({ commit }, table) {
      commit('TABLE_MOUNTED', table);
    },

    async doReset({ commit, dispatch }) {
      commit('RESETED');
      return dispatch('doFetch');
    },

    async doExport({ commit, getters }) {
      try {
        if (!iamListExporterFields || !iamListExporterFields.length) {
          throw new Error('iamListExporterFields is required');
        }

        commit('EXPORT_STARTED');

        const filter = getters.filter;

        const response = await IamService.fetchUsers(
          filter,
          getters.orderBy,
          null,
          null,
        );

        new Exporter(
          iamListExporterFields,
          i18n('iam.users.exporterFileName'),
        ).transformAndExportAsExcelFile(response.rows);

        commit('EXPORT_SUCCESS');
      } catch (error) {
        Errors.handle(error);

        commit('EXPORT_ERROR');
      }
    },

    doChangePagination(
      { commit, getters, dispatch },
      pagination,
    ) {
      commit('PAGINATION_CHANGED', pagination);
      const filter = getters.filter;
      dispatch('doFetch', { filter, keepPagination: true });
    },

    doChangePaginationPageSize(
      { commit, getters, dispatch },
      pageSize,
    ) {
      commit('PAGINATION_PAGE_SIZE_CHANGED', pageSize);
      const filter = getters.filter;
      dispatch('doFetch', { filter, keepPagination: true });
    },

    doChangePaginationCurrentPage(
      { commit, getters, dispatch },
      currentPage,
    ) {
      commit(
        'PAGINATION_CURRENT_PAGE_CHANGED',
        currentPage,
      );
      const filter = getters.filter;
      dispatch('doFetch', { filter, keepPagination: true });
    },

    doChangeSort({ commit, getters, dispatch }, sorter) {
      commit('SORTER_CHANGED', sorter);
      const filter = getters.filter;
      dispatch('doFetch', { filter, keepPagination: true });
    },

    async doFetch(
      { commit, getters },
      { filter, keepPagination } = {},
    ) {
      try {
        commit('FETCH_STARTED', { filter, keepPagination });

        const response = await IamService.fetchUsers(
          filter,
          getters.orderBy,
          getters.limit,
          getters.offset,
        );

        commit('FETCH_SUCCESS', {
          rows: response.rows,
          count: response.count,
        });
      } catch (error) {
        Errors.handle(error);
        commit('FETCH_ERROR');
      }
    },

    async doDisableAllSelected({
      getters,
      commit,
      dispatch,
    }) {
      try {
        const selectedRows = getters.selectedRows;

        commit('CHANGE_STATUS_SELECTED_STARTED');

        await IamService.disable(
          selectedRows.map((user) => user.id),
        );

        commit('CHANGE_STATUS_SELECTED_SUCCESS');

        Message.success(i18n('iam.doDisableAllSuccess'));

        const filter = getters.filter;
        dispatch('doFetch', { filter });
      } catch (error) {
        Errors.handle(error);

        commit('CHANGE_STATUS_SELECTED_ERROR');

        const filter = getters.filter;
        dispatch('doFetch', { filter });
      }
    },

    async doEnableAllSelected({
      commit,
      getters,
      dispatch,
    }) {
      try {
        const selectedRows = getters.selectedRows;

        commit('CHANGE_STATUS_SELECTED_STARTED');

        await IamService.enable(
          selectedRows.map((user) => user.id),
        );

        commit('CHANGE_STATUS_SELECTED_SUCCESS');

        Message.success(i18n('iam.doEnableAllSuccess'));

        const filter = getters.filter;
        dispatch('doFetch', { filter });
      } catch (error) {
        Errors.handle(error);

        commit('CHANGE_STATUS_SELECTED_ERROR');

        const filter = getters.filter;
        dispatch('doFetch', { filter });
      }
    },

    async doRemoveAllSelected({
      commit,
      getters,
      dispatch,
    }) {
      try {
        const selectedRows = getters.selectedRows;

        commit('REMOVE_ALL_SELECTED_STARTED');

        await IamService.remove(
          selectedRows.map((row) => row.email),
          [],
          true,
        );

        dispatch('REMOVE_ALL_SELECTED_SUCCESS');

        Message.success(
          i18n('iam.users.doRemoveAllSelectedSuccess'),
        );

        const filter = getters.filter;
        dispatch('doFetch', { filter });
      } catch (error) {
        Errors.handle(error);

        commit('REMOVE_ALL_SELECTED_ERROR');

        const filter = getters.filter;
        dispatch('doFetch', { filter });
      }
    },
  },
};
