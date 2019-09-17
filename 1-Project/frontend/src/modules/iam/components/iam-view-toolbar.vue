<template>
  <div class="app-page-toolbar">
    <router-link :to="{ path: `/iam/${record.id}/edit` }" v-if="record && hasPermissionToEdit">
      <el-button icon="el-icon-fa-edit" type="primary">
        <app-i18n code="common.edit"></app-i18n>
      </el-button>
    </router-link>

    <el-button
      :disabled="loading"
      :icon="record.disabled ? 'el-icon-fa-check' : 'el-icon-fa-ban'"
      @click="doToggleStatus()"
      type="primary"
      v-if="record && hasPermissionToEdit"
    >
      <app-i18n code="iam.enable" v-if="record.disabled"></app-i18n>
      <app-i18n code="iam.disable" v-if="!record.disabled"></app-i18n>
    </el-button>

    <router-link
      :to="{ path: '/audit-logs', query: { entityId: record.id } }"
      v-if="record && hasPermissionToAuditLogs"
    >
      <el-button icon="el-icon-fa-history">
        <app-i18n code="auditLog.menu"></app-i18n>
      </el-button>
    </router-link>

    <router-link
      :to="{ path: '/audit-logs', query: { createdByEmail: record.email } }"
      v-if="record && hasPermissionToAuditLogs"
    >
      <el-button icon="el-icon-fa-eye">
        <app-i18n code="iam.view.activity"></app-i18n>
      </el-button>
    </router-link>
  </div>
</template>

<script>
import { IamPermissions } from '@/modules/iam/iam-permissions';
import { AuditLogPermissions } from '@/modules/audit-log/audit-log-permissions';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'app-iam-view-toolbar',

  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
      record: 'iam/view/record',
      loading: 'iam/view/loading',
    }),

    hasPermissionToEdit() {
      return new IamPermissions(this.currentUser).edit;
    },

    hasPermissionToImport() {
      return new IamPermissions(this.currentUser).import;
    },

    hasPermissionToAuditLogs() {
      return new AuditLogPermissions(this.currentUser).read;
    },
  },

  methods: {
    ...mapActions({
      doToggleStatus: 'iam/view/doToggleStatus',
    }),
  },
};
</script>

<style>
</style>
