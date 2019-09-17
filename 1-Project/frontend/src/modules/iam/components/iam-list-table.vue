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

      <el-table-column
        :label="fields.avatarsIam.label"
        :prop="fields.avatarsIam.name"
        align="center"
        width="70px"
      >
        <template slot-scope="scope">
          <app-list-item-image :value="presenter(scope.row, 'avatarsIam')"></app-list-item-image>
        </template>
      </el-table-column>

      <el-table-column :label="fields.email.label" :prop="fields.email.name" sortable="custom">
        <template slot-scope="scope">{{ presenter(scope.row, 'email') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.fullName.label"
        :prop="fields.fullName.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'fullName') }}</template>
      </el-table-column>

      <el-table-column :label="fields.roles.label" :prop="fields.roles.name">
        <template slot-scope="scope">
          <div :key="roleId" v-for="roleId in scope.row.roles">
            <el-tooltip :content="roleDescriptionOf(roleId)">
              <span>{{ roleLabelOf(roleId) }}</span>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        :label="fields.disabledAsStatus.label"
        :prop="fields.disabledAsStatus.name"
        sortable="custom"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row[fields.disabledAsStatus.name] ? 'danger' : 'success'"
          >{{ presenter(scope.row, 'disabledAsStatus') }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        :label="fields.createdAt.label"
        :prop="fields.createdAt.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'createdAt') }}</template>
      </el-table-column>

      <el-table-column :fixed="isMobile? undefined : 'right'" align="center" width="120">
        <template slot-scope="scope">
          <div class="table-actions">
            <router-link :to="`/iam/${scope.row.id}`">
              <el-button type="text">
                <app-i18n code="common.view"></app-i18n>
              </el-button>
            </router-link>

            <router-link :to="`/iam/${scope.row.id}/edit`" v-if="hasPermissionToEdit">
              <el-button type="text">
                <app-i18n code="common.edit"></app-i18n>
              </el-button>
            </router-link>
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
import { UserModel } from '@/modules/auth/user-model';
import { mapGetters, mapActions } from 'vuex';
import { IamPermissions } from '@/modules/iam/iam-permissions';
import Roles from '@/security/roles';

const { fields } = UserModel;

export default {
  name: 'app-iam-list-table',

  mounted() {
    this.doMountTable(this.$refs.table);
  },

  computed: {
    ...mapGetters({
      rows: 'iam/list/rows',
      count: 'iam/list/count',
      loading: 'iam/list/loading',
      pagination: 'iam/list/pagination',
      isMobile: 'layout/isMobile',
      currentUser: 'auth/currentUser',
      paginationLayout: 'layout/paginationLayout',
    }),

    hasPermissionToEdit() {
      return new IamPermissions(this.currentUser).edit;
    },

    fields() {
      return fields;
    },
  },

  methods: {
    ...mapActions({
      doChangeSort: 'iam/list/doChangeSort',
      doChangePaginationCurrentPage:
        'iam/list/doChangePaginationCurrentPage',
      doChangePaginationPageSize:
        'iam/list/doChangePaginationPageSize',
      doMountTable: 'iam/list/doMountTable',
    }),

    roleDescriptionOf(roleId) {
      return Roles.descriptionOf(roleId);
    },

    roleLabelOf(roleId) {
      return Roles.labelOf(roleId);
    },

    presenter(row, fieldName) {
      return UserModel.presenter(row, fieldName);
    },
  },
};
</script>

<style>
</style>
