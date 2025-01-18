<script setup>
import { ref, onMounted } from 'vue';
import { useSupabaseUser, useSupabaseClient } from '#imports';
import { useRouter } from 'vue-router';

const error = ref(null);
const router = useRouter();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const redirectToProfile = () => {
  if (user.value) {
    const username = user.value.user_metadata?.username || user.value.email.split('@')[0];
    if (!username) {
      error.value = "Username is not available!";
      return;
    }
    console.log("Redirecting to username:", username);
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
  <Home />
  <h1>gprofile Index page</h1>
  <div>Loading...</div>
  <p>User: {{ user }}</p>
  <p>Error: {{ error }}</p>
</template>
