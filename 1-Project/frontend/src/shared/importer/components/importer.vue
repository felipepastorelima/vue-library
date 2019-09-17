<template>
  <div>
    <app-importer-toolbar :storePath="storePath"></app-importer-toolbar>
    <app-importer-status :storePath="storePath"></app-importer-status>
    <app-importer-list :storePath="storePath" v-if="hasRows"></app-importer-list>
    <app-importer-form :storePath="storePath" v-if="!hasRows"></app-importer-form>
  </div>
</template>

<script>
import ImporterToolbar from '@/shared/importer/components/importer-toolbar.vue';
import ImporterStatus from '@/shared/importer/components/importer-status.vue';
import ImporterList from '@/shared/importer/components/importer-list.vue';
import ImporterForm from '@/shared/importer/components/importer-form.vue';

export default {
  name: 'app-importer',

  props: ['storePath'],

  components: {
    [ImporterToolbar.name]: ImporterToolbar,
    [ImporterStatus.name]: ImporterStatus,
    [ImporterList.name]: ImporterList,
    [ImporterForm.name]: ImporterForm,
  },

  computed: {
    hasRows() {
      return this.$store.getters[
        `${this.storePath}/hasRows`
      ];
    },
  },
};
</script>

<style>
</style>
