<template>
  <div>
    <el-container>
      <app-menu></app-menu>

      <el-container>
        <el-header>
          <app-header/>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app-layout',
};
</script>

<style>
</style>
