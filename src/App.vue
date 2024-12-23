<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useCountriesStore } from './store/countriesStore';
import NavigationMenu from './components/NavigationMenu.vue';

const store = useCountriesStore();

onMounted(() => {
  store.fetchCountries();
});
</script>

<template>
  <NavigationMenu />
  <RouterView />
</template>

<style scoped lang="scss">

</style>
