<script setup>
// Imports
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSupabaseClient, useSupabaseUser } from '@supabase/auth-helpers-nuxt';

// Reactive variables
const username = ref('');
const profileData = ref(null);
const errorMessage = ref('');
const isLoading = ref(false);

// Supabase client and user
const supabase = useSupabaseClient();
const user = useSupabaseUser();

// Fetch the username from the route
const route = useRoute();
username.value = route.params.username || ''; // Handle undefined username gracefully

// Function to load profile data
const loadProfile = async () => {
  try {
    isLoading.value = true; // Start loading
    if (!user.value) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('username, bio, avatar_url')
      .eq('id', user.value.id)
      .single();

    if (error) throw error;

    profileData.value = data; // Update profile data
  } catch (err) {
    errorMessage.value = err.message || 'Failed to load profile data';
  } finally {
    isLoading.value = false; // End loading
  }
};

// Use lifecycle hook
onMounted(() => {
  loadProfile();
});
</script>

<template>
  <div>
    <Home /> <!-- Home component -->
    <div v-if="isLoading">Loading profile...</div>
    <div v-else-if="errorMessage">
      <p class="error">Error: {{ errorMessage }}</p>
    </div>
    <div v-else>
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {{ profileData?.username || 'N/A' }}</p>
      <p><strong>Bio:</strong> {{ profileData?.bio || 'N/A' }}</p>
      <img v-if="profileData?.avatar_url" :src="profileData.avatar_url" alt="Avatar" />
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>
