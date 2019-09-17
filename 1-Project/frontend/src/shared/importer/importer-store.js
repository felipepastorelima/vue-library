import Errors from '@/shared/error/errors';
import { i18n } from '@/i18n';
import importerStatuses from '@/shared/importer/importer-statuses';
import Importer from '@/shared/importer/importer';
import { EXCEL_TYPE } from '@/shared/excel/excel';
import { chunk } from 'lodash';
import md5 from 'md5';

async function importRow(commit, importer, importFn, row) {
  try {
    const importableRow = await importer.castForImport(row);
    const importHash = md5(JSON.stringify(importableRow));
    await importFn(importableRow, importHash);

    commit('IMPORT_BATCH_SUCCESS', {
      line: row._line,
    });
  } catch (error) {
    commit('IMPORT_BATCH_ERROR', {
      line: row._line,
      errorMessage: Errors.selectMessage(error),
    });
  }
}

export default (
  importFn,
  importFields,
  templateFileName,
  importerHint,
  batchSize = 10,
) => ({
  namespaced: true,

  state: {
    rows: null,
    errorMessage: null,
    importing: false,
    completed: false,
  },

  getters: {
    rows: (state) => state.rows || [],

    hasRows: (state, getters) => !!getters.rows.length,

    errorMessage: (state) => state.errorMessage,

    pendingRows: (state, getters) =>
      getters.rows.filter(
        (row) => row._status === importerStatuses.PENDING,
      ),

    pendingRowsCount: (state, getters) =>
      getters.pendingRows.length,

    rowsCount: (state, getters) => getters.rows.length,

    importedRowsCount: (state, getters) =>
      getters.rows.filter(
        (row) => row._status === importerStatuses.IMPORTED,
      ).length,

    nonPendingRowsCount: (state, getters) =>
      getters.rowsCount - getters.pendingRowsCount,

    errorRowsCount: (state, getters) =>
      getters.rows.filter(
        (row) => row._status === importerStatuses.ERROR,
      ).length,

    importing: (state) => !!state.importing,

    completed: (state) => !!state.completed,

    percent: (state, getters) =>
      Math.round(
        (getters.nonPendingRowsCount * 100) /
          getters.rowsCount,
      ),

    fields: () => importFields,

    hint: () => importerHint,
  },

  mutations: {
    RESETED(state) {
      state.rows = null;
      state.errorMessage = null;
      state.importing = false;
      state.completed = false;
    },

    FILE_READ_ERROR(state, payload) {
      state.errorMessage = payload.message
        ? payload.message
        : payload;
    },

    FILE_READ_SUCCESS(state, payload) {
      state.errorMessage = null;
      state.rows = payload;
    },

    IMPORT_STARTED(state) {
      state.importing = true;
    },

    IMPORT_PAUSED(state) {
      state.importing = false;
    },

    IMPORT_SUCCESS(state) {
      state.importing = false;
      state.completed = true;
    },

    IMPORT_ERROR(state) {
      state.importing = false;
    },

    IMPORT_BATCH_SUCCESS(state, payload) {
      const item = (state.rows || []).find(
        (item) => item._line === payload.line,
      );

      if (!item) {
        return;
      }

      item._status = importerStatuses.IMPORTED;

      state.rows = [...state.rows];
    },

    IMPORT_BATCH_ERROR(state, payload) {
      const item = (state.rows || []).find(
        (item) => item._line === payload.line,
      );

      if (!item) {
        return;
      }

      item._status = importerStatuses.ERROR;
      item._errorMessage = payload.errorMessage;

      state.rows = [...state.rows];
    },
  },

  actions: {
    doReset({ commit }) {
      commit('RESETED');
    },

    doPause({ commit }) {
      commit('IMPORT_PAUSED');
    },

    async doImport({ commit, getters }) {
      try {
        commit('IMPORT_STARTED');

        const pendingRows = getters.pendingRows;

        const importer = new Importer(importFields);

        const pendingBatches = chunk(
          pendingRows,
          batchSize,
        );

        for (let batch of pendingBatches) {
          const paused = !getters.importing;

          if (paused) {
            return;
          }

          await Promise.all(
            batch.map((row) =>
              importRow(commit, importer, importFn, row),
            ),
          );
        }

        commit('IMPORT_SUCCESS');
      } catch (error) {
        Errors.handle(error);
        commit('IMPORT_ERROR');
      }
    },

    doDownloadTemplate() {
      const importer = new Importer(importFields);
      importer.downloadTemplate(templateFileName);
    },

    async doReadFile({ commit }, file) {
      try {
        const isExcel = file.type === EXCEL_TYPE;

        if (!isExcel) {
          throw new Error(
            i18n('importer.errors.invalidFileExcel'),
          );
        }

        const importer = new Importer(importFields);

        let rawData = await importer.convertExcelFileToJson(
          file,
        );

        if (!rawData || !rawData.length) {
          throw new Error(
            i18n('importer.errors.invalidFileEmpty'),
          );
        }

        rawData = await Promise.all(
          rawData.map(async (row, index) => {
            return await importer.castForDisplay(
              row,
              index,
            );
          }),
        );

        commit('FILE_READ_SUCCESS', rawData);
      } catch (error) {
        console.error(error);
        commit('FILE_READ_ERROR', error);
      }
    },
  },
});
