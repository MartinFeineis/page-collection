<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const error = ref(null)
const data = ref()
const username = ref()
//const supabase = useSupabaseClient();
const router = useRouter();
const user = useSupabaseUser()

// const redirectToProfile = async () => {
//   const { data: user, error } = await supabase.auth.getUser();

//   if (error) {
//     console.log('Error fetching user:', error);
//     return;
//   }

//   if (user) {
//     const username = user.user_metadata.username || user.email.split('@')[0]; // Use a username or email prefix
//     // Redirect to the dynamic profile page
//     router.push(`/gprofile/${username}`);
//   }
// };
const redirectToProfile = () => {
  if (user) {
    const username = user.user_metadata.username || user.email.split('@')[0]; // Use a username or email prefix
    // Redirect to the dynamic profile page
    router.push(`/gprofile/${username}`);
  }
  else {
    const error = "Not working!"
  }
};

import { onMounted } from 'vue';

onMounted(() => {
  redirectToProfile();
});

</script>

<template>
  <h1>gprofile Index page </h1>
  <Home />
  <div>Loading...</div>
  <p>Username: {{ username }}</p>
  <p>data: {{ data }}</p>
  <p>user: {{ user }}</p>
  <p>error: {{ error }}</p>
</template>
