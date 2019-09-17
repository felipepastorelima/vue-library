<template>
  <div class="error-page">
    <div class="imgBlock">
      <div class="imgEle" style="background-image: url(/images/500.svg)"></div>
    </div>
    <div class="content">
      <h1>500</h1>
      <div class="desc">
        <app-i18n code="errors.500"></app-i18n>
      </div>
      <div class="actions">
        <router-link :to="{ path: '/' }">
          <el-button>
            <app-i18n code="errors.backToHome"></app-i18n>
          </el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-error-500-page',
};
</script>
