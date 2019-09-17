<template>
  <div style="margin-bottom: 24px" v-if="hasRows">
    <el-progress :percentage="percent" style="margin-bottom: 24px" v-if="isProcessing"></el-progress>

    <el-alert :closable="false" :type="alertType">
      <span v-if="isProcessing">
        <app-i18n code="importer.noNavigateAwayMessage"></app-i18n>&#160;
      </span>
      <app-i18n
        :args="[
          importedRowsCount,
          pendingRowsCount,
          errorRowsCount
        ]"
        code="importer.total"
      ></app-i18n>
    </el-alert>
  </div>
</template>

<script>
export default {
  name: 'app-importer-status',

  props: ['storePath'],

  computed: {
    alertType() {
      if (this.isAllSuccess) {
        return 'success';
      }

      if (this.isSomeErrors) {
        return 'warning';
      }

      if (this.isAllErrors) {
        return 'error';
      }

      if (this.isAllPending) {
        return 'info';
      }

      return 'info';
    },

    hasRows() {
      return this.$store.getters[
        `${this.storePath}/hasRows`
      ];
    },

    percent() {
      return this.$store.getters[
        `${this.storePath}/percent`
      ];
    },

    importedRowsCount() {
      return this.$store.getters[
        `${this.storePath}/importedRowsCount`
      ];
    },

    errorRowsCount() {
      return this.$store.getters[
        `${this.storePath}/errorRowsCount`
      ];
    },

    pendingRowsCount() {
      return this.$store.getters[
        `${this.storePath}/pendingRowsCount`
      ];
    },

    isImporting() {
      return this.$store.getters[
        `${this.storePath}/importing`
      ];
    },

    isCompleted() {
      return this.$store.getters[
        `${this.storePath}/completed`
      ];
    },

    isAllErrors() {
      return (
        this.errorRowsCount ===
        this.$store.getters[`${this.storePath}/rowsCount`]
      );
    },

    isSomeErrors() {
      return !this.isAllErrors && this.errorRowsCount;
    },

    isAllSuccess() {
      return this.importedRowsCount && !this.errorRowsCount;
    },

    isAllPending() {
      return (
        !this.isAllErrors &&
        !this.isSomeErrors &&
        !this.isAllSuccess
      );
    },

    isProcessing() {
      return !this.isCompleted && this.isImporting;
    },
  },
};
</script>

<style>
</style>
