<script setup lang="ts">
import { ref, watch} from 'vue';
import { useRoute } from 'vue-router'
import { useCountriesStore } from '../store/countriesStore';
import PopulationFilter from '../components/PopulationFilter.vue';
import PopulationChart from '../components/PopulationChart.vue';
import type { Country } from '../models';

let region = ref('');
const minPopulation = ref(0);
const maxPopulation = ref(Infinity);
const regionCountries = ref<Country[]>([]);
const route = useRoute();
const store = useCountriesStore();

watch(
  () => ([route.params.region, store.isLoading, minPopulation.value, maxPopulation.value]),
  ([newRegion]) => {
    region.value = newRegion as string;
    regionCountries.value = store.getRegionCountries(region.value, minPopulation.value, maxPopulation.value);
  },
  {immediate: true}
)

function onFilter({ min, max }: { min: number; max: number }) {
  minPopulation.value = min;
  maxPopulation.value = max;
}
</script>

<template>
  <div class="region">
    <h1 class="region__title" data-testid="region-title">{{ region }}</h1>
    <PopulationFilter @filter="onFilter" />
    <PopulationChart v-if="!store.isLoading" :data="regionCountries" data-testid="region-chart" />
  </div>
</template>

<style lang="scss" scoped>
.region {
  &__title {
    color: #2c3e50;
  }
}
</style>