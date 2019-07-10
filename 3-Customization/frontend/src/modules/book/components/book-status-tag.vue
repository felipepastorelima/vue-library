<template>
  <div>
    <el-tag type="success" v-if="value==='available'">{{this.label}}</el-tag>
    <el-tag type="danger" v-if="value==='unavailable'">{{this.label}}</el-tag>
  </div>
</template>

<script>
import { i18n } from '@/i18n';

export default {
  name: 'app-book-status-tag',
  props: ['value'],
  computed: {
    label() {
      return i18n(
        `entities.book.enumerators.status.${this.value}`,
      );
    },
  },
};
</script>

<style>
</style>
