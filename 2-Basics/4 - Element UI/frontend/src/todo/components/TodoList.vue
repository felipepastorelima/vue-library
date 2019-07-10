<template>
  <div>
    <el-table v-loading="loading" :data="list" style="width: 100%">
      <el-table-column prop="id" label="Id" width="180"></el-table-column>
      <el-table-column prop="text" label="Text"></el-table-column>
      <el-table-column fixed="right" width="120">
        <template slot-scope="scope">
          <el-button @click="doDestroy(scope.row.id)" type="danger" size="small">&times;</el-button>
        </template>
      </el-table-column>
    </el-table>
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
