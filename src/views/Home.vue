<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCountriesStore } from '../store/countriesStore';
import PopulationFilter from '../components/PopulationFilter.vue';
import PopulationChart from '../components/PopulationChart.vue';
import type { Region } from '../models';

const minPopulation = ref(0);
const maxPopulation = ref(Infinity);
const store = useCountriesStore();

const regionsChartData = computed<Region[]>(() => store.getRegions(minPopulation.value, maxPopulation.value));

function onFilter({ min, max }: { min: number; max: number }) {
  minPopulation.value = min;
  maxPopulation.value = max;
}
</script>

<template>
  <div class="home">
    <h1 class="home__title">All regions</h1>
    <PopulationFilter @filter="onFilter" data-testid="test-population-filter" />
    <PopulationChart v-if="!store.isLoading && regionsChartData.length" :data="regionsChartData" />
    <p v-else-if="store.isLoading">Loading...</p>
    <p v-else>No data available</p>
  </div>
</template>

<style lang="scss" scoped>
.home {
  text-align: center;

  &__title {
    color: #2c3e50;
    white-space: nowrap;
  }
}
</style>
