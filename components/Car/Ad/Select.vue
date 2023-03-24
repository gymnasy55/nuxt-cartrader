<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    default: () => [],
  },
});
const { title, options } = toRefs(props);

const emits = defineEmits(['change-input']);
const state = ref('');

const onChange = () => {
  emits('change-input', state.value, props.name);
};
</script>

<template>
  <div class="flex flex-col w-[48%] mt-2">
    <label for="" class="text-cyan-500 mb-1 text-sm">{{ title }}</label>
    <select
      id=""
      v-model="state"
      name=""
      class="p-2 border w-100 rounded"
      @change="onChange"
    >
      <option v-for="option in options" :key="option.id" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>
