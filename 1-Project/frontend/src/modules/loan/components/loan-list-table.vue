<template>
  <div>
    <el-table
      :border="true"
      :data="rows"
      @sort-change="doChangeSort"
      ref="table"
      row-key="id"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column :label="fields.id.label" :prop="fields.id.name" sortable="custom">
        <template slot-scope="scope">{{ presenter(scope.row, 'id') }}</template>
      </el-table-column>

      <el-table-column :label="fields.book.label" :prop="fields.book.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-one
            :label="fields.book.label"
            :permission="fields.book.readPermission"
            :url="fields.book.viewUrl"
            :value="presenter(scope.row, 'book')"
          ></app-list-item-relation-to-one>
        </template>
      </el-table-column>

      <el-table-column :label="fields.member.label" :prop="fields.member.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-one
            :label="fields.member.label"
            :permission="fields.member.readPermission"
            :url="fields.member.viewUrl"
            :value="presenter(scope.row, 'member')"
          ></app-list-item-relation-to-one>
        </template>
      </el-table-column>

      <el-table-column
        :label="fields.issueDate.label"
        :prop="fields.issueDate.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'issueDate') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.dueDate.label"
        :prop="fields.dueDate.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'dueDate') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.returnDate.label"
        :prop="fields.returnDate.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'returnDate') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.status.label"
        :prop="fields.status.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'status') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.createdAt.label"
        :prop="fields.createdAt.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'createdAt') }}</template>
      </el-table-column>

      <el-table-column :fixed="isMobile? undefined : 'right'" align="center" width="180">
        <template slot-scope="scope">
          <div class="table-actions">
            <router-link :to="`/loan/${scope.row.id}`">
              <el-button type="text">
                <app-i18n code="common.view"></app-i18n>
              </el-button>
            </router-link>

            <router-link :to="`/loan/${scope.row.id}/edit`" v-if="hasPermissionToEdit">
              <el-button type="text">
                <app-i18n code="common.edit"></app-i18n>
              </el-button>
            </router-link>

            <el-button
              :disabled="destroyLoading"
              @click="doDestroyWithConfirm(scope.row.id)"
              type="text"
              v-if="hasPermissionToDestroy"
            >
              <app-i18n code="common.destroy"></app-i18n>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="el-pagination-wrapper">
      <el-pagination
        :current-page="pagination.currentPage || 1"
        :disabled="loading"
        :layout="paginationLayout"
        :total="count"
        @current-change="doChangePaginationCurrentPage"
        @size-change="doChangePaginationPageSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { LoanModel } from '@/modules/loan/loan-model';
import { mapGetters, mapActions } from 'vuex';
import { LoanPermissions } from '@/modules/loan/loan-permissions';
import { i18n } from '@/i18n';

const { fields } = LoanModel;

export default {
  name: 'app-loan-list-table',

  mounted() {
    this.doMountTable(this.$refs.table);
  },

  computed: {
    ...mapGetters({
      rows: 'loan/list/rows',
      count: 'loan/list/count',
      loading: 'loan/list/loading',
      pagination: 'loan/list/pagination',
      isMobile: 'layout/isMobile',
      currentUser: 'auth/currentUser',
      destroyLoading: 'loan/destroy/loading',
      paginationLayout: 'layout/paginationLayout',
    }),

    hasPermissionToEdit() {
      return new LoanPermissions(this.currentUser).edit;
    },

    hasPermissionToDestroy() {
      return new LoanPermissions(this.currentUser).destroy;
    },

    fields() {
      return fields;
    },
  },

  methods: {
    ...mapActions({
      doChangeSort: 'loan/list/doChangeSort',
      doChangePaginationCurrentPage:
        'loan/list/doChangePaginationCurrentPage',
      doChangePaginationPageSize:
        'loan/list/doChangePaginationPageSize',
      doMountTable: 'loan/list/doMountTable',
      doDestroy: 'loan/destroy/doDestroy',
    }),

    presenter(row, fieldName) {
      return LoanModel.presenter(row, fieldName);
    },

    async doDestroyWithConfirm(id) {
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

        return this.doDestroy(id);
      } catch (error) {
        // no
      }
    },
  },
};
</script>

<style>
</style>
