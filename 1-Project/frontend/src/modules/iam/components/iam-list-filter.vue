<template>
  <el-form
    :label-position="labelPosition"
    :label-width="labelWidthFilter"
    :model="model"
    :rules="rules"
    @submit.native.prevent="doFilter"
    class="filter"
    ref="form"
  >
    <el-row>
      <el-col :lg="12" :md="16" :sm="24">
        <el-form-item :label="fields.id.label" :prop="fields.id.name">
          <el-input v-model="model[fields.id.name]"/>
        </el-form-item>
      </el-col>
      <el-col style="margin-bottom: -0.41px;" :lg="12" :md="16" :sm="24">
        <el-form-item  :label="fields.createdAtRange.label" :prop="fields.createdAtRange.name">
          <el-date-picker type="datetimerange" v-model="model[fields.createdAtRange.name]"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :lg="12" :md="16" :sm="24">
        <el-form-item :label="fields.email.label" :prop="fields.email.name">
          <el-input v-model="model[fields.email.name]"/>
        </el-form-item>
      </el-col>
      <el-col :lg="12" :md="16" :sm="24">
        <el-form-item :label="fields.fullName.label" :prop="fields.fullName.name">
          <el-input v-model="model[fields.fullName.name]"/>
        </el-form-item>
      </el-col>
      <el-col :lg="12" :md="16" :sm="24">
        <el-form-item :label="fields.status.label" :prop="fields.status.name">
          <el-select placeholder v-model="model[fields.status.name]">
            <el-option :value="undefined">--</el-option>
            <el-option
              :key="option.id"
              :label="option.label"
              :value="option.id"
              v-for="option in fields.status.options"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="12" :md="16" :sm="24">
        <el-form-item :label="fields.role.label" :prop="fields.role.name">
          <el-select placeholder v-model="model[fields.role.name]">
            <el-option :value="undefined">--</el-option>
            <el-option
              :key="option.value"
              :label="option.label"
              :value="option.value"
              v-for="option in fields.role.options"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <div class="filter-buttons">
      <el-button :disabled="loading" @click="doFilter" icon="el-icon-fa-search" type="primary">
        <app-i18n code="common.search"></app-i18n>
      </el-button>

      <el-button :disabled="loading" @click="doResetFilter" icon="el-icon-fa-undo">
        <app-i18n code="common.reset"></app-i18n>
      </el-button>
    </div>
  </el-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { FilterSchema } from '@/shared/form/filter-schema';
import { i18n } from '@/i18n';
import { UserModel } from '@/modules/auth/user-model';

const { fields } = UserModel;

const filterSchema = new FilterSchema([
  fields.id,
  fields.createdAtRange,
  fields.email,
  fields.fullName,
]);

export default {
  name: 'app-iam-list-filter',

  data() {
    return {
      rules: filterSchema.rules(),
      model: {},
    };
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthFilter: 'layout/labelWidthFilter',
      loading: 'iam/list/loading',
      filter: 'iam/list/filter',
    }),

    fields() {
      return fields;
    },
  },

  async mounted() {
    this.model = filterSchema.initialValues(
      this.filter,
      this.$route.query,
    );

    return this.doFilter();
  },

  methods: {
    ...mapActions({
      doReset: 'iam/list/doReset',
      doFetch: 'iam/list/doFetch',
    }),

    async doResetFilter() {
      this.model = filterSchema.initialValues();
      this.$refs.form.clearValidate();
      return this.doReset();
    },

    async doFilter() {
      try {
        await this.$refs.form.validate();
        this.$refs.form.clearValidate();
      } catch (error) {
        return;
      }

      const filter = filterSchema.cast(this.model);
      return this.doFetch({
        filter,
      });
    },

    i18n(code) {
      return i18n(code);
    },
  },
};
</script>

<style>
</style>
