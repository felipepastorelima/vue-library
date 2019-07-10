<template>
  <div>
    <h1>Todos</h1>
    <TodoForm @submit="doSubmit" />
    <TodoList :list="list" :loading="loading" @destroy="doDestroy" />
  </div>
</template>

<script>
import todoService from "../todoService";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

export default {
  name: "TodoPage",

  components: {
    TodoList,
    TodoForm
  },

  data() {
    return {
      loading: true,
      list: []
    };
  },

  async created() {
    this.list = await todoService.list();
    this.loading = false;
  },

  methods: {
    async doSubmit(todo) {
      this.loading = true;
      await todoService.create(todo);
      this.list = await todoService.list();
      this.loading = false;
    },

    async doDestroy(id) {
      this.loading = true;
      await todoService.destroy(id);
      this.list = await todoService.list();
      this.loading = false;
    }
  }
};
</script>

<style>
</style>
