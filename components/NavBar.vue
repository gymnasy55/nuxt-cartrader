<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const onLogout = async () => {
  const { error } = await supabase.auth.signOut();

  try {
    await $fetch('/api/_supabase/session', {
      method: 'POST',
      body: {
        event: 'SIGNED_OUT',
        session: null,
      },
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    return console.error(error);
  }

  if (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  }
  navigateTo('/');
};
</script>

<template>
  <header
    class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md"
  >
    <NuxtLink to="/" class="text-3xl font-mono">cartrader</NuxtLink>
    <div v-if="user" class="flex">
      <NuxtLink to="/profile/listings" class="mr-5">Profile</NuxtLink>
      <button @click="onLogout">Logout</button>
    </div>
    <NuxtLink v-else to="/login">Login</NuxtLink>
  </header>
</template>
