<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.loan.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.loan.list.title"></app-i18n>
      </h1>

      <app-loan-list-toolbar></app-loan-list-toolbar>
      <app-loan-list-filter></app-loan-list-filter>
      <app-loan-list-table></app-loan-list-table>
    </div>
  </div>
</template>

<script>
import LoanListFilter from '@/modules/loan/components/loan-list-filter.vue';
import LoanListTable from '@/modules/loan/components/loan-list-table.vue';
import LoanListToolbar from '@/modules/loan/components/loan-list-toolbar.vue';

export default {
  name: 'app-loan-list-page',

  components: {
    [LoanListFilter.name]: LoanListFilter,
    [LoanListTable.name]: LoanListTable,
    [LoanListToolbar.name]: LoanListToolbar,
  },
};
</script>

<style>
</style>
