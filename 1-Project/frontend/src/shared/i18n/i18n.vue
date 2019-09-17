<template>
  <span v-html="message"></span>
</template>

<script>
import { i18n } from '@/i18n';

export default {
  name: 'app-i18n',
  props: ['code', 'args'],
  computed: {
    message: function() {
      return i18n(this.code, ...(this.args || []));
    },
  },
};
</script>

<style>
</style>
