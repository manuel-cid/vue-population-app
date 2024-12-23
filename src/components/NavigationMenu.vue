<script setup lang="ts">
  const regions = ['Africa', 'Americas', 'Antarctic', 'Asia', 'Europe', 'Oceania'];
</script>

<template>
  <nav class="navigation-menu" data-testid="navigation-menu">
    <ul class="navigation-menu__list">
      <li class="navigation-menu__item">
        <router-link to="/" class="navigation-menu__link" activeClass="navigation-menu__link--active" data-testid="nav-link">All</router-link>
      </li>
      <li v-for="region in regions" class="navigation-menu__item">
        <router-link :to="`/${region}`" class="navigation-menu__link" activeClass="navigation-menu__link--active" data-testid="nav-link">
          {{ region }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.navigation-menu {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style-type: none;
    padding: 0;
  }

  &__item {
    display: inline;
    margin-right: 1em;
  }

  &__link {
    text-decoration: none;

    &--active,
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
