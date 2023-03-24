<script setup>
const { makes } = useCars();
const modal = ref({
  make: false,
  location: false,
  price: false,
});
const city = ref('');
const priceRange = ref({
  min: '',
  max: '',
});
const route = useRoute();
const router = useRouter();

const priceRangeText = computed(() => {
  const minPrice = route.query.minPrice;
  const maxPrice = route.query.maxPrice;

  if (!minPrice && !maxPrice) return 'Any';
  else if (!minPrice && maxPrice) {
    return `< $${maxPrice}`;
  } else if (minPrice && !maxPrice) {
    return `> $${minPrice}`;
  } else {
    return `$${minPrice} - $${maxPrice}`;
  }
});

const updateModal = (key) => {
  modal.value[key] = !modal.value[key];
};

const onChangeLocation = () => {
  if (!city.value) {
    return;
  }
  if (!isNaN(parseInt(city.value))) {
    throw createError({
      statusCode: 400,
      message: 'Invalid city format',
    });
  }
  updateModal('location');
  navigateTo(`/city/${city.value.toLowerCase()}/car/${route.params.make}`);
};

const onChangeMake = (make) => {
  updateModal('make');
  navigateTo(`/city/${route.params.city}/car/${make}`);
};

const onChangePrice = () => {
  const min = parseInt(priceRange.value.min);
  const max = parseInt(priceRange.value.max);
  if (!isNaN(min) && !isNaN(max)) {
    if (min > max) {
      return;
    }
  }

  const query = {};
  if (!isNaN(min)) {
    query.minPrice = min;
  }
  if (!isNaN(max)) {
    query.maxPrice = max;
  }

  updateModal('price');
  router.push({
    query,
  });
};
</script>

<template>
  <div class="shadow border w-64 mr-10 z-30 h-[195px]">
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Location</h3>
      <h3 class="text-blue-400 capitalize" @click="updateModal('location')">
        {{ route.params.city }}
      </h3>
      <div
        v-if="modal.location"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
      >
        <input v-model="city" type="text" class="border p-1 rounded" />
        <button
          class="bg-blue-400 w-full mt-2 rounded text-white p-1"
          @click="onChangeLocation"
        >
          Apply
        </button>
      </div>
    </div>

    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Make</h3>
      <h3 class="text-blue-400 capitalize" @click="updateModal('make')">
        {{ route.params.make || 'any' }}
      </h3>
      <div
        v-if="modal.make"
        class="absolute border shadow left-56 p-5 top-1 -m-1 w-[600px] flex justify-between flex-wrap bg-white"
      >
        <h4
          v-for="make in makes"
          :key="make"
          class="w-1/3"
          @click="onChangeMake(make)"
        >
          {{ make }}
        </h4>
      </div>
    </div>

    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Price</h3>
      <h3 class="text-blue-400 capitalize" @click="updateModal('price')">
        {{ priceRangeText }}
      </h3>
      <div
        v-if="modal.price"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
      >
        <input
          v-model="priceRange.min"
          class="border p-1 rounded"
          type="number"
          placeholder="Min"
        />
        <input
          v-model="priceRange.max"
          class="border p-1 rounded"
          type="number"
          placeholder="Max"
        />
        <button
          class="bg-blue-400 w-full mt-2 rounded text-white p-1"
          @click="onChangePrice"
        >
          Apply
        </button>
      </div>
    </div>
  </div>
</template>
