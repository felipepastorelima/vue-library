<template>
  <div class="auth">
    <div class="wrapper signin">
      <div class="content">
        <div class="logo">
          <h1>
            <app-i18n code="app.title"></app-i18n>
          </h1>
        </div>

        <el-form
          :model="model"
          :rules="rules"
          @submit.prevent.native="doSubmit"
          class="form"
          label-position="left"
          label-width="0px"
          ref="form"
        >
          <el-form-item :prop="fields.email.name">
            <el-input
              :placeholder="fields.email.label"
              auto-complete="off"
              ref="focus"
              type="text"
              v-model="model[fields.email.name]"
            ></el-input>
          </el-form-item>

          <el-form-item :prop="fields.password.name">
            <el-input
              :placeholder="fields.password.label"
              auto-complete="off"
              type="password"
              v-model="model[fields.password.name]"
            ></el-input>
          </el-form-item>

          <div>
            <div
              class="w-100"
              style="margin-bottom: 16px; display: flex; align-items: baseline; justify-content: space-between;"
            >
              <el-checkbox v-model="model[fields.rememberMe.name]">{{ fields.rememberMe.label }}</el-checkbox>

              <router-link :to="{ path: '/auth/forgot-password' }">
                <el-button type="text">
                  <app-i18n code="auth.forgotPassword"></app-i18n>
                </el-button>
              </router-link>
            </div>
          </div>

          <el-form-item class="form-buttons">
            <el-button :loading="loading" class="w-100" native-type="submit" type="primary">
              <app-i18n code="auth.signin"></app-i18n>
            </el-button>
          </el-form-item>

          <div class="other-actions">
            <router-link :to="{ path: '/auth/signup' }">
              <el-button type="text">
                <app-i18n code="auth.createAnAccount"></app-i18n>
              </el-button>
            </router-link>
          </div>

          <app-i18n-flags></app-i18n-flags>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { UserModel } from '@/modules/auth/user-model';

const { fields } = UserModel;

export default {
  name: 'app-signin-page',

  data() {
    return {
      rules: {
        email: fields.email.forFormRules(),
        password: fields.password.forFormRules(),
        rememberMe: fields.rememberMe.forFormRules(),
      },
      model: {
        rememberMe: true,
      },
    };
  },

  computed: {
    ...mapGetters({
      loading: 'auth/loading',
    }),

    fields() {
      return fields;
    },
  },

  methods: {
    ...mapActions({
      doSigninWithEmailAndPassword:
        'auth/doSigninWithEmailAndPassword',
    }),

    async doSubmit() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return;
      }

      await this.doSigninWithEmailAndPassword({
        email: this.model.email,
        password: this.model.password,
        rememberMe: this.model.rememberMe,
      });
    },
  },
};
</script>

<style>
</style>
