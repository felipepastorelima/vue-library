<template>
  <form @submit.prevent="doSubmit">
    <input v-model="todo.text" />
    <button type="submit">Submit</button>
    {{ todo.text }}
  </form>
</template>

<script>
export default {
  name: "TodoForm",

  data() {
    return {
      todo: {
        text: ""
      }
    };
  },

  methods: {
    doSubmit() {
      this.$emit("submit", { ...this.todo });
      this.todo = { text: "" };
    }
  }
};
</script>

<style>
</style>
