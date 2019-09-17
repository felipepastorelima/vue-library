<template>
  <div class="app-page-toolbar">
    <router-link
      :to="{ path: '/audit-logs', query: { entityNames: 'settings' } }"
      v-if="hasPermissionToAuditLogs"
    >
      <el-button icon="el-icon-fa-history">
        <app-i18n code="auditLog.menu"></app-i18n>
      </el-button>
    </router-link>
  </div>
</template>

<script>
import { AuditLogPermissions } from '@/modules/audit-log/audit-log-permissions';
import { mapGetters } from 'vuex';

export default {
  name: 'app-settings-toolbar',

  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
    }),

    hasPermissionToAuditLogs() {
      return new AuditLogPermissions(this.currentUser).read;
    },
  },
};
</script>

<style>
</style>
