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
        <app-i18n code="iam.view.title"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="iam.view.title"></app-i18n>
      </h1>

      <app-iam-view-toolbar v-if="record"></app-iam-view-toolbar>

      <div class="app-page-spinner" v-if="loading" v-loading="loading"></div>

      <el-form
        :label-position="labelPosition"
        :label-width="labelWidthForm"
        @submit.prevent.native
        class="form"
        v-if="record && !loading"
      >
        <app-view-item-text :label="fields.id.label" :value="presenter(record, 'id')"></app-view-item-text>

        <app-view-item-text :label="fields.email.label" :value="presenter(record, 'email')"></app-view-item-text>

        <app-view-item-text :label="fields.firstName.label" :value="presenter(record, 'firstName')"></app-view-item-text>

        <app-view-item-text :label="fields.lastName.label" :value="presenter(record, 'lastName')"></app-view-item-text>

        <app-view-item-text
          :label="fields.phoneNumber.label"
          :value="presenter(record, 'phoneNumber')"
          prefix="+"
        ></app-view-item-text>

        <app-view-item-image
          :label="fields.avatarsIam.label"
          :value="presenter(record, 'avatarsIam')"
        ></app-view-item-image>

        <app-view-item-custom
          :label="fields.disabledAsStatus.label"
          :value="presenter(record, 'disabledAsStatus')"
        >
          <el-tag
            :type="record[fields.disabledAsStatus.name] ? 'danger' : 'success'"
          >{{ presenter(record, 'disabledAsStatus') }}</el-tag>
        </app-view-item-custom>

        <app-view-item-custom :label="fields.roles.label" :value="presenter(record, 'roles')">
          <div :key="roleId" v-for="roleId in record.roles">
            <el-tooltip :content="roleDescriptionOf(roleId)">
              <span>{{ roleLabelOf(roleId) }}</span>
            </el-tooltip>
          </div>
        </app-view-item-custom>

        <app-view-item-text :label="fields.createdAt.label" :value="presenter(record, 'createdAt')"></app-view-item-text>

        <app-view-item-text :label="fields.updatedAt.label" :value="presenter(record, 'updatedAt')"></app-view-item-text>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { UserModel } from '@/modules/auth/user-model';
import { i18n } from '@/i18n';
import Roles from '@/security/roles';
import IamViewToolbar from '@/modules/iam/components/iam-view-toolbar.vue';

const { fields } = UserModel;

export default {
  name: 'app-iam-view-page',

  props: ['id'],

  components: {
    [IamViewToolbar.name]: IamViewToolbar,
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'iam/view/record',
      loading: 'iam/view/loading',
    }),

    fields() {
      return fields;
    },
  },

  async created() {
    await this.doFind(this.id);
  },

  methods: {
    ...mapActions({
      doFind: 'iam/view/doFind',
    }),

    presenter(record, fieldName) {
      return UserModel.presenter(record, fieldName);
    },

    roleDescriptionOf(roleId) {
      return Roles.descriptionOf(roleId);
    },

    roleLabelOf(roleId) {
      return Roles.labelOf(roleId);
    },

    i18n(code) {
      return i18n(code);
    },
  },
};
</script>
