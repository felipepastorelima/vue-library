<template>
  <div class="app-page-toolbar">
    <router-link :to="{ path: '/iam/new' }" v-if="hasPermissionToCreate">
      <el-button icon="el-icon-fa-plus" type="primary">
        <app-i18n code="common.new"></app-i18n>
      </el-button>
    </router-link>

    <router-link :to="{ path: '/iam/import' }" v-if="hasPermissionToImport">
      <el-button icon="el-icon-fa-upload" type="primary">
        <app-i18n code="common.import"></app-i18n>
      </el-button>
    </router-link>

    <el-tooltip
      :content="removeButtonTooltip"
      :disabled="!removeButtonTooltip"
      v-if="hasPermissionToEdit"
    >
      <span>
        <el-button
          :disabled="removeButtonDisabled"
          @click="doRemoveAllSelected()"
          icon="el-icon-fa-times"
          type="primary"
        >
          <app-i18n code="common.remove"></app-i18n>
        </el-button>
      </span>
    </el-tooltip>

    <el-tooltip
      :content="enableButtonTooltip"
      :disabled="!enableButtonTooltip"
      v-if="hasPermissionToEdit"
    >
      <span>
        <el-button
          :disabled="enableButtonDisabled"
          @click="doEnableAllSelected()"
          icon="el-icon-fa-check"
          type="primary"
        >
          <app-i18n code="iam.enable"></app-i18n>
        </el-button>
      </span>
    </el-tooltip>

    <el-tooltip
      :content="disableButtonTooltip"
      :disabled="!disableButtonTooltip"
      v-if="hasPermissionToEdit"
    >
      <span>
        <el-button
          :disabled="disableButtonDisabled"
          @click="doDisableAllSelected()"
          icon="el-icon-fa-ban"
          type="primary"
        >
          <app-i18n code="iam.disable"></app-i18n>
        </el-button>
      </span>
    </el-tooltip>

    <router-link
      :to="{ path: '/audit-logs', query: { entityNames: 'user' } }"
      v-if="hasPermissionToAuditLogs"
    >
      <el-button icon="el-icon-fa-history">
        <app-i18n code="auditLog.menu"></app-i18n>
      </el-button>
    </router-link>

    <el-tooltip :content="exportButtonTooltip" :disabled="!exportButtonTooltip">
      <span>
        <el-button
          :disabled="exportButtonDisabled"
          @click="doExport()"
          icon="el-icon-fa-file-excel-o"
        >
          <app-i18n code="common.export"></app-i18n>
        </el-button>
      </span>
    </el-tooltip>
  </div>
</template>

<script>
import { AuditLogPermissions } from '@/modules/audit-log/audit-log-permissions';
import { mapGetters, mapActions } from 'vuex';
import { IamPermissions } from '@/modules/iam/iam-permissions';
import { i18n } from '@/i18n';

export default {
  name: 'app-iam-list-toolbar',

  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
      hasRows: 'iam/list/hasRows',
      loading: 'iam/list/loading',
      exportLoading: 'iam/list/exportLoading',
      selectedRows: 'iam/list/selectedRows',
    }),

    hasPermissionToAuditLogs() {
      return new AuditLogPermissions(this.currentUser).read;
    },

    hasPermissionToCreate() {
      return new IamPermissions(this.currentUser).create;
    },

    hasPermissionToEdit() {
      return new IamPermissions(this.currentUser).edit;
    },

    hasPermissionToImport() {
      return new IamPermissions(this.currentUser).import;
    },

    exportButtonDisabled() {
      return (
        !this.hasRows || this.loading || this.exportLoading
      );
    },

    exportButtonTooltip() {
      return !this.hasRows
        ? i18n('common.noDataToExport')
        : null;
    },

    removeButtonDisabled() {
      return !this.selectedRows.length || this.loading;
    },

    removeButtonTooltip() {
      return !this.selectedRows.length
        ? i18n('common.mustSelectARow')
        : null;
    },

    enableButtonDisabled() {
      return !this.selectedRows.length || this.loading;
    },

    enableButtonTooltip() {
      return !this.selectedRows.length
        ? i18n('common.mustSelectARow')
        : null;
    },

    disableButtonDisabled() {
      return !this.selectedRows.length || this.loading;
    },

    disableButtonTooltip() {
      return !this.selectedRows.length
        ? i18n('common.mustSelectARow')
        : null;
    },
  },

  methods: {
    ...mapActions({
      doExport: 'iam/list/doExport',
      doRemoveAllSelected: 'iam/list/doRemoveAllSelected',
      doDisableAllSelected: 'iam/list/doDisableAllSelected',
      doEnableAllSelected: 'iam/list/doEnableAllSelected',
    }),
  },
};
</script>

<style>
</style>
