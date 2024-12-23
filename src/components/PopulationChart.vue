<script setup lang="ts">
import { ref, onMounted, watch, type PropType } from 'vue';
import { Chart, registerables, type ChartItem } from 'chart.js';
import type { Entity } from '../models';
Chart.register(...registerables);

const props = defineProps({
  data: {
    type: Array as PropType<Array<Entity>>,
    required: true,
  }
});

const chart = ref<HTMLCanvasElement | null>(null);
let barChart: Chart | null = null;

onMounted(() => {
  createChart();
});

watch(() => props.data, () => {
  if (barChart) {
    barChart.destroy();
  }
  createChart();
});

function createChart() {
  const ctx = chart.value?.getContext('2d');
  barChart = new Chart(ctx as ChartItem, {
    type: 'bar',
    data: {
      labels: props.data.map((region) => region.name),
      datasets: [{
        label: 'Population',
        data: props.data.map((region) => region.population),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
</script>

<template>
  <div class="population-chart">
    <canvas class="population-chart__canvas" ref="chart"></canvas>
</div>
</template>

<style lang="scss" scoped>
.population-chart {
  position: relative;
  height:40vh;
  width:80vw;
  max-width: 100%;

  &__canvas {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: auto;
    display: block;
    width: 800px;
  }
}
</style>
