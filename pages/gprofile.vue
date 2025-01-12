<script setup>
import { ref, onMounted } from 'vue';
import { useSupabaseUser, useSupabaseClient } from '#imports'; // Auto-imported in Nuxt.js
import { useRouter } from 'vue-router';

const error = ref(null);
const router = useRouter();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const redirectToProfile = () => {
  if (user.value) {
    const username = user.value.user_metadata?.username || user.value.email.split('@')[0];
    router.push(`/guser/${username}`);
  } else {
    error.value = "User is not authenticated!";
  }
};

onMounted(() => {
  redirectToProfile();
});
</script>

<template>
  <h1>gprofile Index page</h1>
  <div>Loading...</div>
  <p>user: {{ user }}</p>
  <p>error: {{ error }}</p>
</template>
