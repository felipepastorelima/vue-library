<template>
  <TodoPage />
</template>

<script>
import TodoPage from "./todo/components/TodoPage";

export default {
  name: "app",

  components: {
    TodoPage
  }
};
</script>

<style>
body {
  padding: 24px;
}
</style>
