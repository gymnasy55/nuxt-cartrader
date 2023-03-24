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
  placeholder: {
    type: String,
    default: () => '',
  },
});
const { title, placeholder } = toRefs(props);

const emits = defineEmits(['change-input']);
const state = ref('');

const onChange = () => {
  emits('change-input', state.value, props.name);
};
</script>

<template>
  <div class="flex flex-col w-[100%] mt-2">
    <label for="" class="text-cyan-500 mb-1 text-sm">{{ title }}</label>
    <textarea
      v-model="state"
      type="text"
      class="p-2 border w-100 rounded"
      :placeholder="placeholder"
      :name="name"
      @input="onChange"
    />
  </div>
</template>
