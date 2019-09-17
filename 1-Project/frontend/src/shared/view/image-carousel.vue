<template>
  <el-carousel
    :arrow="value && value.length > 1 ? 'hover' : 'never'"
    :indicator-position="value && value.length > 1 ? 'outside' : 'none'"
    class="text-center"
    trigger="click"
    v-if="value && value.length"
  >
    <el-carousel-item :key="index" v-for="(image, index) in value">
      <a :href="image.publicUrl" target="_blank">
        <img
          :alt="image.name"
          :src="image.publicUrl"
          style="width: 100%; height: 100%; object-fit: cover"
        >
      </a>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'app-image-carousel',

  props: {
    value: Array,
  },
};
</script>

<style>
</style>
