<script setup>
definePageMeta({
  layout: 'custom',
});

const { makes } = useCars();
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const info = useState('adInfo', () => {
  return {
    make: '',
    model: '',
    year: '',
    miles: '',
    price: '',
    city: '',
    seats: '',
    features: '',
    description: '',
    image: null,
  };
});
const errorMessage = ref('');

const onChangeInput = (data, name) => {
  info.value[name] = data;
};

const inputs = [
  {
    id: 1,
    title: 'Model *',
    name: 'model',
    placeholder: 'Civic',
  },
  {
    id: 2,
    title: 'Year *',
    name: 'year',
    placeholder: '2018',
  },
  {
    id: 3,
    title: 'Price *',
    name: 'price',
    placeholder: '10000',
  },
  {
    id: 4,
    title: 'Miles *',
    name: 'miles',
    placeholder: '10000',
  },
  {
    id: 5,
    title: 'City *',
    name: 'city',
    placeholder: 'Austin',
  },
  {
    id: 6,
    title: 'Number of Seats *',
    name: 'seats',
    placeholder: '5',
  },
  {
    id: 7,
    title: 'Features *',
    name: 'features',
    placeholder: 'Leather Interior, No Accidents',
  },
];

const isButtonDisabled = computed(() => {
  for (const key in info.value) {
    if (!info.value[key]) return true;
  }
  return false;
});

const handleSubmit = async () => {
  const fileName = Math.floor(Math.random() * 1_000_000_000_000);
  const { data, error } = await supabase.storage
    .from('images')
    .upload('public/' + fileName, info.value.image);

  if (error) {
    return (errorMessage.value = error.message);
  }

  const body = {
    ...info.value,
    features: info.value.features.split(', '),
    numberOfSeats: parseInt(info.value.seats),
    year: parseInt(info.value.year),
    miles: parseInt(info.value.miles),
    price: parseInt(info.value.price),
    name: `${info.value.make} ${info.value.model}`,
    listerId: user.value.id,
    image: data.path,
  };

  delete body.seats;

  try {
    await $fetch('/api/car/listings', {
      method: 'POST',
      body,
    });
    navigateTo('/profile/listings');
  } catch (err) {
    errorMessage.value = err.statusMessage;
    await supabase.storage.from('image').remove(data.path);
  }
};
</script>

<template>
  <div>
    <div>
      <h1 class="text-6xl mt-24">Create a New Listing</h1>
    </div>
    <div class="shadow p-3 mt-5 flex flex-wrap justify-between">
      <CarAdSelect
        title="Make *"
        :options="makes"
        name="make"
        @change-input="onChangeInput"
      />
      <CarAdInput
        v-for="input in inputs"
        :key="input.id"
        :title="input.title"
        :name="input.name"
        :placeholder="input.placeholder"
        @change-input="onChangeInput"
      />
      <CarAdTextarea
        title="Description"
        name="description"
        @change-input="onChangeInput"
      />
      <CarAdImage @change-input="onChangeInput" />
      <div>
        <button
          class="bg-blue-400 text-white rounded py-2 px-7 mt-3"
          :disabled="isButtonDisabled"
          @click="handleSubmit"
        >
          Submit
        </button>
        <p v-if="errorMessage" class="mt-3 text-red-400">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>
