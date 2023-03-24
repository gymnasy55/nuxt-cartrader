<script setup>
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="even:bg-gray-100 p-4">
    <h1 class="font-bold text-2xl">{{ props.message.name }}</h1>
    <p class="text-gray-700">
      {{ props.message.message }}
    </p>
    <div class="flex items-center mt-4">
      <p class="text-green-700 mr-10">{{ props.message.email }}</p>
      <p class="text-blue-700">{{ props.message.phoneNumber }}</p>
    </div>
  </div>
</template>
