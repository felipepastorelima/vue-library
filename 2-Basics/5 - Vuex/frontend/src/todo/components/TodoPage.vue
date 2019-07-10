<template>
  <div>
    <h1>Todos</h1>
    <TodoForm />
    <TodoList />
  </div>
</template>

<script>
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

export default {
  name: "TodoPage",

  components: {
    TodoList,
    TodoForm
  }
};
</script>

<style>
</style>
