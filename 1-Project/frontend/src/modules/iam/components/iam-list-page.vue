<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="iam.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="iam.title"></app-i18n>
      </h1>

      <app-iam-list-toolbar></app-iam-list-toolbar>
      <app-iam-list-filter></app-iam-list-filter>
      <app-iam-list-table></app-iam-list-table>
    </div>
  </div>
</template>

<script>
import IamListFilter from '@/modules/iam/components/iam-list-filter.vue';
import IamListTable from '@/modules/iam/components/iam-list-table.vue';
import IamListToolbar from '@/modules/iam/components/iam-list-toolbar.vue';

export default {
  name: 'app-iam-list-page',

  components: {
    [IamListFilter.name]: IamListFilter,
    [IamListTable.name]: IamListTable,
    [IamListToolbar.name]: IamListToolbar,
  },
};
</script>

<style>
</style>
