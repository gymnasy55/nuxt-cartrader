<script setup>
const route = useRoute();
const { toTitleCase } = useUtilities();
const { car } = await useFetchCar(route.params.id);

useHead({
  title: toTitleCase(route.params.name),
});

definePageMeta({
  layout: 'custom',
});
</script>

<template>
  <div v-if="car">
    <CarDetailHero :car="car" />
    <CarDetailAttributes :features="car.features" />
    <CarDetailDescription :description="car.description" />
    <CarDetailContact />
  </div>
</template>
