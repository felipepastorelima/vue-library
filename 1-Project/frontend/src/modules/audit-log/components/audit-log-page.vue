<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="auditLog.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="auditLog.title"></app-i18n>
      </h1>

      <app-audit-log-toolbar></app-audit-log-toolbar>
      <app-audit-log-filter></app-audit-log-filter>
      <app-audit-log-table></app-audit-log-table>
    </div>
  </div>
</template>

<script>
import AuditLogTable from '@/modules/audit-log/components/audit-log-table.vue';
import AuditLogToolbar from '@/modules/audit-log/components/audit-log-toolbar.vue';
import AuditLogFilter from '@/modules/audit-log/components/audit-log-filter.vue';

export default {
  name: 'app-audit-log-page',

  components: {
    [AuditLogFilter.name]: AuditLogFilter,
    [AuditLogToolbar.name]: AuditLogToolbar,
    [AuditLogTable.name]: AuditLogTable,
  },
};
</script>

