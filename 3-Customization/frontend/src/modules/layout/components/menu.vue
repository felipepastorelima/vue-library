<template>
  <el-aside :width="asideWidth">
    <h1 class="logo">
      <router-link to="/">
        <app-i18n code="app.title"></app-i18n>
      </router-link>
    </h1>

    <el-menu
      :class="{
        'el-menu-side-nav': true,
        collapsed: collapsed,
      }"
      :collapse="collapsed"
      :collapse-transition="false"
      :router="true"
      @select="collapseMenuIfMobile()"
    >
      <el-menu-item
        :class="classFor('/audit-logs')"
        :route="{ path: '/audit-logs' }"
        index="/audit-logs"
        v-if="hasPermissionToAuditLog"
      >
        <i class="el-icon-fa-history"></i>
        <span slot="title">
          <app-i18n code="auditLog.menu"></app-i18n>
        </span>
      </el-menu-item>

      <el-menu-item
        :class="classFor('/settings')"
        :route="{ path: '/settings' }"
        index="/settings"
        v-if="hasPermissionToSettings"
      >
        <i class="el-icon-fa-cog"></i>
        <span slot="title">
          <app-i18n code="settings.menu"></app-i18n>
        </span>
      </el-menu-item>

      <el-menu-item
        :class="classFor('/iam')"
        :route="{ path: '/iam' }"
        index="/iam"
        v-if="hasPermissionToIam"
      >
        <i class="el-icon-fa-user-plus"></i>
        <span slot="title">
          <app-i18n code="iam.menu"></app-i18n>
        </span>
      </el-menu-item>

      <el-menu-item
        :class="classFor('/loan')"
        :route="{ path: '/loan' }"
        index="/loan"
        v-if="hasPermissionToLoan"
      >
        <i class="el-icon-fa-address-card-o"></i>
        <span slot="title">
          <app-i18n code="entities.loan.menu"></app-i18n>
        </span>
      </el-menu-item>

      <el-menu-item
        :class="classFor('/book')"
        :route="{ path: '/book' }"
        index="/book"
        v-if="hasPermissionToBook"
      >
        <i class="el-icon-fa-book"></i>
        <span slot="title">
          <app-i18n code="entities.book.menu"></app-i18n>
        </span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { SettingsPermissions } from '@/modules/settings/settings-permissions';
import { AuditLogPermissions } from '@/modules/audit-log/audit-log-permissions';
import { IamPermissions } from '@/modules/iam/iam-permissions';
import { LoanPermissions } from '@/modules/loan/loan-permissions';
import { BookPermissions } from '@/modules/book/book-permissions';

export default {
  name: 'app-menu',

  computed: {
    ...mapGetters({
      collapsed: 'layout/menuCollapsed',
      isMobile: 'layout/isMobile',
      currentUser: 'auth/currentUser',
    }),

    hasPermissionToSettings() {
      return new SettingsPermissions(this.currentUser).edit;
    },

    hasPermissionToAuditLog() {
      return new AuditLogPermissions(this.currentUser).read;
    },

    hasPermissionToIam() {
      return new IamPermissions(this.currentUser).read;
    },

    hasPermissionToLoan() {
      return new LoanPermissions(this.currentUser).read;
    },
    hasPermissionToBook() {
      return new BookPermissions(this.currentUser).read;
    },

    asideWidth() {
      if (!this.collapsed) {
        return '200px';
      }

      return '0px';
    },
  },

  methods: {
    ...mapActions({
      collapseMenu: 'layout/collapseMenu',
    }),

    collapseMenuIfMobile() {
      if (this.isMobile) {
        this.collapseMenu();
      }
    },

    classFor(path, exact = false) {
      if (exact) {
        return {
          active: this.$route.path === path,
        };
      }

      return {
        active: this.$route.path.startsWith(path),
      };
    },
  },
};
</script>

<style scoped>
.el-menu.collapsed span {
  visibility: hidden;
}
</style>
