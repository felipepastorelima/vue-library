<template>
  <div>
    <div v-if="loading">Loading...</div>
    <ul v-if="!loading">
      <li v-for="item of list" :key="item.id">
        {{item.text}}
        <button type="button" @click="doDestroy(item.id)">&times;</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  props: ["list", "loading"],
  methods: {
    doDestroy(id) {
      this.$emit("destroy", id);
    }
  }
};
</script>

<style>
</style>
