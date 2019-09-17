<template>
  <div class="app-page-toolbar">
    <el-tooltip :content="hint" :disabled="!hint" v-if="!hasRows">
      <span>
        <el-button @click="doDownloadTemplate" icon="el-icon-fa-file-excel-o">
          <app-i18n code="importer.form.downloadTemplate"></app-i18n>
        </el-button>
      </span>
    </el-tooltip>

    <el-button
      @click="doImport"
      icon="el-icon-fa-upload"
      type="primary"
      v-if="hasRows && !importing && !completed"
    >
      <app-i18n code="common.import"></app-i18n>
    </el-button>

    <el-button @click="doPause" icon="el-icon-fa-pause" v-if="hasRows && importing">
      <app-i18n code="common.pause"></app-i18n>
    </el-button>

    <el-button @click="doNew" icon="el-icon-fa-file-o" v-if="!!completed">
      <app-i18n code="common.new"></app-i18n>
    </el-button>

    <el-button
      @click="doDiscard"
      icon="el-icon-fa-trash"
      v-if="hasRows && !importing && !completed"
    >
      <app-i18n code="common.discard"></app-i18n>
    </el-button>
  </div>
</template>

<script>
import { i18n } from '@/i18n';

export default {
  name: 'app-importer-toolbar',

  props: ['storePath'],

  computed: {
    hasRows() {
      return this.$store.getters[
        `${this.storePath}/hasRows`
      ];
    },
    importing() {
      return this.$store.getters[
        `${this.storePath}/importing`
      ];
    },
    completed() {
      return this.$store.getters[
        `${this.storePath}/completed`
      ];
    },
    hint() {
      return this.$store.getters[`${this.storePath}/hint`];
    },
  },

  methods: {
    async doNew() {
      try {
        await this.$confirm(
          i18n('common.areYouSure'),
          i18n('common.confirm'),
          {
            confirmButtonText: i18n('common.yes'),
            cancelButtonText: i18n('common.no'),
            type: 'warning',
          },
        );

        return this.$store.dispatch(
          `${this.storePath}/doReset`,
        );
      } catch (error) {
        // no
      }
    },

    async doDiscard() {
      try {
        await this.$confirm(
          i18n('importer.list.discardConfirm'),
          i18n('common.confirm'),
          {
            confirmButtonText: i18n('common.yes'),
            cancelButtonText: i18n('common.no'),
            type: 'warning',
          },
        );

        return this.$store.dispatch(
          `${this.storePath}/doReset`,
        );
      } catch (error) {
        // no
      }
    },

    doReset() {
      return this.$store.dispatch(
        `${this.storePath}/doReset`,
      );
    },
    doPause() {
      return this.$store.dispatch(
        `${this.storePath}/doPause`,
      );
    },
    doImport() {
      return this.$store.dispatch(
        `${this.storePath}/doImport`,
      );
    },
    doDownloadTemplate() {
      return this.$store.dispatch(
        `${this.storePath}/doDownloadTemplate`,
      );
    },
  },
};
</script>

<style>
</style>
