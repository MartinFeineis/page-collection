<script setup>
import { useRouter } from 'vue-router'; // Ensure Vue Router is set up in your project
const supabase = useSupabaseClient();
const router = useRouter();

// const loadProfile = async () => {
//   const { data: user, error } = await supabase.auth.getUser();
//   if (error) {
//     console.log(error);
//     return;
//   }
  
//   if (user) {
//     const username = user.user_metadata.username || user.email.split('@')[0]; // Use username if available or fallback
//     // Redirect to user-specific profile page
//     router.push(`/gprofile/${username}`);
//   }
// };

// const {
//   data: { user },
// } = await supabase.auth.getUser()
// let metadata = user.user_metadata


// // Load user profile when this page is visited
// loadProfile();
// const supabase = useSupabaseClient()
// loading.value = true
// const user = useSupabaseUser()

const { data } = await supabase
  .from('profiles')
  .select(`username, bio, avatar_url`)
  .eq('id', user.value.id)
  .single()

// if (data) {
//   username.value = data.username
//   website.value = data.website
//   avatar_path.value = data.avatar_url
// }

// loading.value = false
</script>

<template>
  <Home />
<div> {{ data }}</div>
</template>