<template>
  <div>
    <el-upload
      :accept="accept"
      :auto-upload="false"
      :on-change="onChange"
      :show-file-list="false"
      action
      drag
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        <app-i18n code="importer.form.hint"></app-i18n>
      </div>
    </el-upload>

    <p class="text-red" v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { EXCEL_EXTENSION } from '@/shared/excel/excel';
import { EXCEL_TYPE } from '@/shared/excel/excel';

export default {
  name: 'app-importer-form',

  props: ['storePath'],

  computed: {
    errorMessage() {
      return this.$store.getters[
        `${this.storePath}/errorMessage`
      ];
    },

    accept() {
      return `${EXCEL_TYPE}, ${EXCEL_EXTENSION}`;
    },
  },

  methods: {
    onChange(file) {
      if (file) {
        this.$store.dispatch(
          `${this.storePath}/doReadFile`,
          file.raw,
        );
      }
    },
  },
};
</script>

<style>
</style>
