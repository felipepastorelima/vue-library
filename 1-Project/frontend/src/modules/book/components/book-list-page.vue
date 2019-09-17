<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.book.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.book.list.title"></app-i18n>
      </h1>

      <app-book-list-toolbar></app-book-list-toolbar>
      <app-book-list-filter></app-book-list-filter>
      <app-book-list-table></app-book-list-table>
    </div>
  </div>
</template>

<script>
import BookListFilter from '@/modules/book/components/book-list-filter.vue';
import BookListTable from '@/modules/book/components/book-list-table.vue';
import BookListToolbar from '@/modules/book/components/book-list-toolbar.vue';

export default {
  name: 'app-book-list-page',

  components: {
    [BookListFilter.name]: BookListFilter,
    [BookListTable.name]: BookListTable,
    [BookListToolbar.name]: BookListToolbar,
  },
};
</script>

<style>
</style>
