<template>
  <div class="auth">
    <div class="wrapper empty-permissions">
      <div class="content">
        <div class="logo">
          <h1>
            <app-i18n code="app.title"></app-i18n>
          </h1>
        </div>

        <h3 style="font-weight: normal; text-align: center">
          <app-i18n code="auth.emptyPermissions.message"></app-i18n>
        </h3>

        <div class="other-actions">
          <el-button @click="doSignout()" type="text">
            <app-i18n code="auth.signout"></app-i18n>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'app-empty-permissions-page',

  methods: {
    ...mapActions({
      doSignout: 'auth/doSignout',
    }),
  },
};
</script>
