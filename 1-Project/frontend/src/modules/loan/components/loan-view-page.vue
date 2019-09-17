<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/loan' }">
        <app-i18n code="entities.loan.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.loan.view.title"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.loan.view.title"></app-i18n>
      </h1>

      <div class="app-page-spinner" v-if="loading" v-loading="loading"></div>

      <app-loan-view-toolbar v-if="record"></app-loan-view-toolbar>

      <el-form
        :label-position="labelPosition"
        :label-width="labelWidthForm"
        @submit.prevent.native
        class="form"
        v-if="record"
      >
        <app-view-item-text :label="fields.id.label" :value="presenter(record, 'id')"></app-view-item-text>

        <app-view-item-relation-to-one
          :label="fields.book.label"
          :permission="fields.book.readPermission"
          :url="fields.book.viewUrl"
          :value="presenter(record, 'book')"
        ></app-view-item-relation-to-one>

        <app-view-item-relation-to-one
          :label="fields.member.label"
          :permission="fields.member.readPermission"
          :url="fields.member.viewUrl"
          :value="presenter(record, 'member')"
        ></app-view-item-relation-to-one>

        <app-view-item-text :label="fields.issueDate.label" :value="presenter(record, 'issueDate')"></app-view-item-text>

        <app-view-item-text :label="fields.dueDate.label" :value="presenter(record, 'dueDate')"></app-view-item-text>

        <app-view-item-text :label="fields.returnDate.label" :value="presenter(record, 'returnDate')"></app-view-item-text>

        <app-view-item-text :label="fields.status.label" :value="presenter(record, 'status')"></app-view-item-text>

        <app-view-item-text :label="fields.createdAt.label" :value="presenter(record, 'createdAt')"></app-view-item-text>

        <app-view-item-text :label="fields.updatedAt.label" :value="presenter(record, 'updatedAt')"></app-view-item-text>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LoanViewToolbar from '@/modules/loan/components/loan-view-toolbar.vue';
import { LoanModel } from '@/modules/loan/loan-model';

const { fields } = LoanModel;

export default {
  name: 'app-loan-view-page',

  props: ['id'],

  components: {
    [LoanViewToolbar.name]: LoanViewToolbar,
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'loan/view/record',
      loading: 'loan/view/loading',
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
      doFind: 'loan/view/doFind',
    }),

    presenter(record, fieldName) {
      return LoanModel.presenter(record, fieldName);
    },
  },
};
</script>
