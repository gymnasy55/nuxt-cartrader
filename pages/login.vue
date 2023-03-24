<script setup>
definePageMeta({
  layout: 'custom',
});

const supabase = useSupabaseClient();

const onLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
</script>

<template>
  <div class="mt-10">
    <h1 class="text-5xl font-bold mb-7">Log in</h1>
    <button
      class="bg-red-400 p-3 rounded text-white font-bold"
      @click="onLogin"
    >
      Login with Google
    </button>
  </div>
</template>
