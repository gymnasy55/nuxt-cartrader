<script setup>
const props = defineProps({
  cars: {
    type: Array,
    required: true,
  },
});
const { cars } = toRefs(props);

const favorite = useLocalStorage('favorite', {});

const handleFavorite = (id) => {
  if (id in favorite.value) {
    delete favorite.value[id];
  } else {
    favorite.value = {
      ...favorite.value,
      [id]: true,
    };
  }
};
</script>

<template>
  <div class="w-full">
    <CarCard
      v-for="car in cars"
      :key="car.id"
      :car="car"
      :favor="car.id in favorite"
      @favor="handleFavorite"
    />
  </div>
</template>
