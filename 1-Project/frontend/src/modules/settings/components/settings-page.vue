<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="settings.title"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="settings.title"></app-i18n>
      </h1>

      <app-settings-toolbar></app-settings-toolbar>

      <div class="app-page-spinner" v-if="findLoading" v-loading="findLoading"></div>

      <el-form
        :label-position="labelPosition"
        :label-width="labelWidthForm"
        :model="model"
        :rules="rules"
        @submit.native.prevent="doSubmit"
        class="form"
        ref="form"
        v-if="model"
      >
        <el-form-item
          :label="fields.theme.label"
          :prop="fields.theme.name"
          :required="fields.theme.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <el-select filterable placeholder v-model="model[fields.theme.name]" value-key="id">
              <el-option
                :key="option.id"
                :label="option.label"
                :value="option.id"
                v-for="option in fields.theme.options"
              >
                <div :style="{ backgroundColor: option.hex }" class="settings-box"></div>
                &#160; {{ option.label }}
              </el-option>
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
import { SettingsModel } from '@/modules/settings/settings-model';
import { mapGetters, mapActions } from 'vuex';
import { FormSchema } from '@/shared/form/form-schema';
import SettingsToolbar from '@/modules/settings/components/settings-toolbar.vue';

const { fields } = SettingsModel;
const formSchema = new FormSchema([fields.theme]);

export default {
  name: 'app-settings-page',

  components: {
    [SettingsToolbar.name]: SettingsToolbar,
  },

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
      settings: 'settings/settings',
      findLoading: 'settings/findLoading',
      saveLoading: 'settings/saveLoading',
    }),

    fields() {
      return fields;
    },
  },

  async created() {
    await this.doFind();
    this.model = formSchema.initialValues(this.settings);
  },

  methods: {
    ...mapActions({
      doFind: 'settings/doFind',
      doSave: 'settings/doSave',
    }),

    doReset() {
      this.model = formSchema.initialValues(this.settings);
    },

    async doSubmit() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return;
      }

      const values = formSchema.cast(this.model);
      return this.doSave(values);
    },
  },
};
</script>

<style>
.settings-box {
  float: left;
  width: 20px;
  height: 20px;
  margin: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
}
</style>
