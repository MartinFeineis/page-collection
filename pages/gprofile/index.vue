<script setup>
// import { useRouter } from 'vue-router';
// import { useSupabaseClient } from '@supabase/vue';

// const supabase = useSupabaseClient();
// const router = useRouter();

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

// redirectToProfile();
</script>

<template>
  <div>Loading...</div>
</template>
