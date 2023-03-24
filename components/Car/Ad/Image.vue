<script setup>
const image = useState('carImage', () => ({
  preview: null,
  image: null,
}));

const emits = defineEmits(['change-input']);

const onImageUpload = (event) => {
  const input = event.target;
  if (input.files) {
    const reader = new FileReader();
    reader.onload = (e) => {
      image.value.preview = e.target.result;
    };
    image.value.image = input.files[0];
    reader.readAsDataURL(input.files[0]);
    emits('change-input', input.files[0], 'image');
  }
};
</script>

<template>
  <div class="col-md-5 offset-md-1 mt-2 w-full">
    <label for="" class="text-cyan-500 mb-1 text-sm">Image</label>
    <form class="mt-2">
      <div class="form-group">
        <div class="relative">
          <input
            type="file"
            accept="image/*"
            class="opacity-0 absolute cursor-pointer"
            @change="onImageUpload"
          />
          <span class="cursor-pointer">Browse File</span>
        </div>
        <div v-if="image.preview" class="border p-2 mt-3 w-56">
          <img :src="image.preview" alt="preview" class="img-fluid" />
        </div>
      </div>
    </form>
  </div>
</template>
