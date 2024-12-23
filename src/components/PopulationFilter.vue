<script setup lang="ts">
import { ref, watch } from 'vue';

const minPopulation = ref();
const maxPopulation = ref();

const emit = defineEmits({
  filter: ({ min, max }) => {
    min = min === '' ? 0 : min;
    max = max === '' ? Infinity : max;
    return {min, max};
  }
})
const emitFilterValues = () => {
  emit('filter', { min: minPopulation.value || 0, max: maxPopulation.value || Infinity });
};

watch([minPopulation, maxPopulation], () => emitFilterValues());
</script>

<template>
  <div class="population-filter">
    <div class="population-filter__controls">
      <label class="population-filter__label" for="minPopulation">Min Population:</label>
      <input
        class="population-filter__input"
        type="number"
        id="minPopulation"
        v-model="minPopulation"
      />

      <label class="population-filter__label" for="maxPopulation">Max Population:</label>
      <input
        class="population-filter__input"
        type="number"
        id="maxPopulation"
        v-model="maxPopulation"
      />
    </div>
  </div>
</template>

<style lang="scss">
.population-filter {
  &__controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
  }

  &__label {
    margin-bottom: 0.5rem;
  }

  &__input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
</style>
