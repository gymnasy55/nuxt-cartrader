<script setup>
const route = useRoute();

const minPrice = computed(() => route.query.minPrice);
const maxPrice = computed(() => route.query.maxPrice);

const { cars, refresh } = await useFetchCars(route.params.city, {
  minPrice,
  maxPrice,
  make: route.params.make,
});

watch(route.query, () => refresh());
</script>

<template>
  <CarCards v-if="cars?.length" :cars="cars" />
  <h1 v-else class="text-red-600">No cars found with such filters</h1>
</template>
