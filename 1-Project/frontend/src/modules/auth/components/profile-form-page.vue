<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="auth.profile.title"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="auth.profile.title"></app-i18n>
      </h1>

      <el-form
        :label-position="labelPosition"
        :label-width="labelWidthForm"
        :model="model"
        :rules="rules"
        @submit.native.prevent="doSubmit"
        class="form"
        ref="form"
      >
        <el-form-item
          :label="fields.firstName.label"
          :prop="fields.firstName.name"
          :required="fields.firstName.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <el-input ref="focus" v-model="model[fields.firstName.name]"/>
          </el-col>
        </el-form-item>

        <el-form-item
          :label="fields.lastName.label"
          :prop="fields.lastName.name"
          :required="fields.lastName.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <el-input v-model="model[fields.lastName.name]"/>
          </el-col>
        </el-form-item>

        <el-form-item
          :label="fields.phoneNumber.label"
          :prop="fields.phoneNumber.name"
          :required="fields.phoneNumber.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <el-input prefix-icon="el-icon-fa-plus" v-model="model[fields.phoneNumber.name]"/>
          </el-col>
        </el-form-item>

        <el-form-item
          :label="fields.avatarsProfile.label"
          :prop="fields.avatarsProfile.name"
          :required="fields.avatarsProfile.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <app-image-upload
              :max="fields.avatarsProfile.max"
              :path="fields.avatarsProfile.path(currentUser.authenticationUid)"
              :schema="fields.avatarsProfile.fileSchema"
              v-model="model[fields.avatarsProfile.name]"
            ></app-image-upload>
          </el-col>
        </el-form-item>

        <el-form-item>
          <div class="form-buttons">
            <el-button
              :disabled="saveLoading"
              @click="doSubmit"
              icon="el-icon-fa-floppy-o"
              type="primary"
            >
              <app-i18n code="common.save"></app-i18n>
            </el-button>

            <el-button :disabled="saveLoading" @click="doReset" icon="el-icon-fa-undo">
              <app-i18n code="common.reset"></app-i18n>
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { UserModel } from '@/modules/auth/user-model';
import { mapGetters, mapActions } from 'vuex';
import { FormSchema } from '@/shared/form/form-schema';

const { fields } = UserModel;

const formSchema = new FormSchema([
  fields.firstName,
  fields.lastName,
  fields.phoneNumber,
  fields.avatarsProfile,
]);

export default {
  name: 'app-profile-form-page',

  data() {
    return {
      rules: formSchema.rules(),
      model: null,
    };
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      currentUser: 'auth/currentUser',
      saveLoading: 'auth/loadingUpdateProfile',
    }),

    fields() {
      return fields;
    },
  },

  async created() {
    this.model = formSchema.initialValues(this.currentUser);
  },

  methods: {
    ...mapActions({
      doUpdateProfile: 'auth/doUpdateProfile',
    }),

    doReset() {
      this.model = formSchema.initialValues(
        this.currentUser,
      );
    },

    async doSubmit() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return;
      }

      const values = formSchema.cast(this.model);
      this.doUpdateProfile(values);
    },
  },
};
</script>

