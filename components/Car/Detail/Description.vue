<script setup>
const props = defineProps({
  description: {
    type: String,
    required: true,
  },
});
const { description } = toRefs(props);
</script>

<template>
  <div class="mt-5">
    <p class="mb-10">
      {{ description }}
    </p>
  </div>
</template>
