<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/iam' }">
        <app-i18n code="iam.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="iam.new.title"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="iam.new.title"></app-i18n>
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
          :label="fields.emails.label"
          :prop="fields.emails.name"
          :required="fields.emails.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <el-select
              :no-data-text="i18n('iam.new.emailsHint')"
              allow-create
              default-first-option
              filterable
              multiple
              placeholder
              ref="focus"
              v-model="model[fields.emails.name]"
            ></el-select>
          </el-col>
        </el-form-item>

        <div v-if="isUniqueEmail">
          <el-form-item
            :label="fields.firstName.label"
            :prop="fields.firstName.name"
            :required="fields.firstName.required"
          >
            <el-col :lg="11" :md="16" :sm="24">
              <el-input v-model="model[fields.firstName.name]"/>
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
            :label="fields.avatarsIam.label"
            :prop="fields.avatarsIam.name"
            :required="fields.avatarsIam.required"
          >
            <el-col :lg="11" :md="16" :sm="24">
              <app-image-upload
                :max="fields.avatarsIam.max"
                :path="fields.avatarsIam.path"
                :schema="fields.avatarsIam.fileSchema"
                v-model="model[fields.avatarsIam.name]"
              ></app-image-upload>
            </el-col>
          </el-form-item>
        </div>

        <el-form-item
          :label="fields.rolesRequired.label"
          :prop="fields.rolesRequired.name"
          :required="fields.rolesRequired.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <el-select multiple placeholder v-model="model[fields.rolesRequired.name]">
              <el-option
                :key="option.value"
                :label="option.label"
                :value="option.value"
                v-for="option in fields.rolesRequired.options"
              ></el-option>
            </el-select>
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
import { mapGetters, mapActions } from 'vuex';
import { FormSchema } from '@/shared/form/form-schema';
import { UserModel } from '@/modules/auth/user-model';
import { i18n } from '@/i18n';

const { fields } = UserModel;
const formSchema = new FormSchema([
  fields.emails,
  fields.firstName,
  fields.lastName,
  fields.phoneNumber,
  fields.avatarsIam,
  fields.rolesRequired,
]);

export default {
  name: 'app-iam-new-page',

  data() {
    return {
      rules: formSchema.rules(),
      model: {},
    };
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      saveLoading: 'iam/form/saveLoading',
    }),

    isUniqueEmail() {
      return (
        !this.model ||
        !this.model.emails ||
        this.model.emails.length <= 1
      );
    },

    fields() {
      return fields;
    },
  },

  async created() {
    await this.doNew();
    this.doReset();
  },

  methods: {
    ...mapActions({
      doNew: 'iam/form/doNew',
      doAdd: 'iam/form/doAdd',
    }),

    doReset() {
      this.model = formSchema.initialValues();
      this.$refs.form.resetFields();
    },

    async doSubmit() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return;
      }

      const values = formSchema.cast(this.model);
      return this.doAdd(values);
    },

    i18n(code) {
      return i18n(code);
    },
  },
};
</script>
