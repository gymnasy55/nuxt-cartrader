<script setup>
const route = useRoute();
const message = ref({
  name: '',
  email: '',
  phoneNumber: '',
  message: '',
});
const errorMessage = ref('');
const successMessage = ref('');

const isButtonDisabled = computed(() => {
  for (const key in message.value) {
    if (!message.value[key]) return true;
  }
  return false;
});

const onSubmit = async () => {
  try {
    await $fetch(`/api/car/listings/${route.params.id}/message`, {
      method: 'POST',
      body: message.value,
    });
    message.value = {
      name: '',
      email: '',
      phoneNumber: '',
      message: '',
    };
    successMessage.value = 'Message sent!';
    errorMessage.value = '';
  } catch (err) {
    errorMessage.value = err.statusMessage;
    successMessage.value = '';
  }
};
</script>

<template>
  <div class="mt-10">
    <div class="flex w-[600px] justify-between">
      <input
        v-model="message.name"
        type="text"
        class="border p-1"
        placeholder="Name"
      />
      <input
        v-model="message.email"
        type="text"
        class="border p-1"
        placeholder="Email"
      />
      <input
        v-model="message.phoneNumber"
        type="text"
        class="border p-1"
        placeholder="Phone"
      />
    </div>
    <div class="flex mt-4 w-[600px]">
      <textarea
        v-model="message.message"
        class="border p-1 w-full"
        placeholder="Message"
      />
    </div>
    <button
      class="bg-blue-400 text-white px-10 py-3 rounded mt-4"
      :disabled="isButtonDisabled"
      @click="onSubmit"
    >
      Submit
    </button>
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
    <p v-if="successMessage" class="text-green-500">{{ successMessage }}</p>
  </div>
</template>
