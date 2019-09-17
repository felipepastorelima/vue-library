<template>
  <el-row>
    <el-col :span="4">
      <h1>
        <i
          @click="toggleMenu"
          class="text-contrast raw-icon el-icon-fa-bars"
          style="cursor: pointer; margin-right: 35px"
        ></i>
      </h1>
    </el-col>
    <el-col :span="20" style="text-align: right">
      <div class="header-actions">
        <el-dropdown @command="handleDropdownCommand">
          <span class="el-dropdown-link">
            <div class="el-dropdown-link-body">
              <div class="app-avatar" style="margin-right: 8px;">
                <img :src="currentUserAvatar" v-if="currentUserAvatar">
              </div>
              <span v-if="!isMobile">{{ currentUserNameOrEmailPrefix }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="doEditProfile">
              <i class="el-icon-fa-user-o"></i> &#160;
              <app-i18n code="auth.profile.title"></app-i18n>
            </el-dropdown-item>
            <el-dropdown-item command="doSignout">
              <i class="el-icon-fa-sign-out"></i> &#160;
              <app-i18n code="auth.signout"></app-i18n>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <app-i18n-select class="hide-xs"></app-i18n-select>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { i18n } from '@/i18n';

export default {
  name: 'app-header',

  computed: {
    ...mapGetters({
      currentUserNameOrEmailPrefix:
        'auth/currentUserNameOrEmailPrefix',
      currentUserAvatar: 'auth/currentUserAvatar',
      isMobile: 'layout/isMobile',
    }),
  },

  methods: {
    ...mapActions({
      toggleMenu: 'layout/toggleMenu',
      doSignout: 'auth/doSignout',
    }),

    i18n(key, args) {
      return i18n(key, args);
    },

    handleDropdownCommand(command) {
      if (command === 'doSignout') {
        this.doSignout();
      }

      if (command === 'doEditProfile') {
        this.doEditProfile();
      }
    },

    doEditProfile() {
      return this.$router.push('/auth/edit-profile');
    },
  },
};
</script>

<style>
</style>
