<script setup>
definePageMeta({
  layout: 'custom',
});
const user = useSupabaseUser();

const { data: listings } = await useFetch(
  `/api/car/listings/user/${user.value.id}`,
);

const onDelete = async (id) => {
  await $fetch(`/api/car/listings/${id}`, { method: 'DELETE' });
  listings.value = listings.value.filter((listing) => listing.id !== id);
};
</script>

<template>
  <div>
    <div class="flex justify-between mt-24 items-center">
      <h1 class="text-6xl">My Listings</h1>
      <NuxtLink
        to="/profile/listings/create"
        class="w-9 h-9 bg-blue-400 flex justify-center items-center rounded-full text-white font-bold cursor-pointer"
      >
        +
      </NuxtLink>
    </div>
    <CarListingCard
      v-for="listing in listings"
      :key="listing.id"
      :listing="listing"
      @delete="onDelete"
    />
  </div>
</template>
