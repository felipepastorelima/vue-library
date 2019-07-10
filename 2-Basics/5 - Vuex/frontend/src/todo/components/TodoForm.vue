<template>
  <el-form ref="form" :inline="true" :rules="rules" @submit.native.prevent="doSubmit" :model="todo">
    <el-form-item label="Todo" prop="text" :required="true">
      <el-input v-model="todo.text"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "TodoForm",

  data() {
    return {
      rules: {
        text: [
          {
            required: true,
            message: "Todo is required"
          },
          {
            min: 2,
            max: 255,
            message: "Length should be 2 to 255"
          }
        ]
      },
      todo: {
        text: ""
      }
    };
  },

  methods: {
    ...mapActions({
      doCreate: "todo/doCreate"
    }),

    async doSubmit() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return;
      }

      this.doCreate({ ...this.todo });
      await this.$refs.form.resetFields();
    }
  }
};
</script>

<style>
</style>
