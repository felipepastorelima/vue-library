<template>
  <div class="auth">
    <div class="wrapper email-unverified">
      <div class="content">
        <div class="logo">
          <h1>
            <app-i18n code="app.title"></app-i18n>
          </h1>
        </div>

        <h3 style="font-weight: normal; text-align: center">
          <app-i18n code="auth.verifyEmail.message"></app-i18n>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'app-verify-email-page',

  async mounted() {
    await this.doVerifyEmail(this.$route.query.token);
  },

  methods: {
    ...mapActions({
      doVerifyEmail: 'auth/doVerifyEmail',
    }),
  },
};
</script>

<style>
</style>
