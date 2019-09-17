<template>
  <div>
    <el-tag type="info" v-if="isPending">
      <app-i18n code="importer.pending"></app-i18n>
    </el-tag>

    <el-tag type="success" v-if="isImported">
      <app-i18n code="importer.imported"></app-i18n>
    </el-tag>

    <p v-if="isError">
      <el-tag type="danger">
        <app-i18n code="importer.error"></app-i18n>
      </el-tag>&#160;
      <span
        class="text-red"
        style="white-space: pre-wrap; word-wrap: break-word;"
      >{{ errorMessage }}</span>
    </p>
  </div>
</template>

<script>
import importerStatuses from '@/shared/importer/importer-statuses';

export default {
  name: 'app-importer-status-row',

  props: ['value', 'errorMessage'],

  computed: {
    isPending() {
      return this.value === importerStatuses.PENDING;
    },

    isImported() {
      return this.value === importerStatuses.IMPORTED;
    },

    isError() {
      return this.value === importerStatuses.ERROR;
    },
  },
};
</script>

<style>
</style>
