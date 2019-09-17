<template>
  <div class="chart">
    <canvas :id="id"></canvas>
  </div>
</template>

<script>
import uuid from 'uuid/v4';
import Chart from 'chart.js';

export default {
  name: 'app-home-chart',

  props: ['config'],

  data() {
    return {
      id: uuid(),
    };
  },

  mounted() {
    const ctx = document.getElementById(this.id);
    new Chart(ctx, this.config);
  },
};
</script>

<style>
.chart {
  background-color: white;
  padding: 24px;
  border: 1px solid #e8e8e8;
}
</style>
