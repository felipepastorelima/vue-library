<template>
  <div>
    <el-tag type="info" v-if="value==='closed'">{{this.label}}</el-tag>
    <el-tag type="success" v-if="value==='inProgress'">{{this.label}}</el-tag>
    <el-tag type="danger" v-if="value==='overdue'">{{this.label}}</el-tag>
  </div>
</template>

<script>
import { i18n } from '@/i18n';

export default {
  name: 'app-loan-status-tag',
  props: ['value'],
  computed: {
    label() {
      return i18n(
        `entities.loan.enumerators.status.${this.value}`,
      );
    },
  },
};
</script>

<style>
</style>
