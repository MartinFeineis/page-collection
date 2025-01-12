<script setup>
import { ref, onMounted } from 'vue';
import { useSupabaseClient, useSupabaseUser } from '#imports';

// Reactive variables
const profileData = ref(null);
const errorMessage = ref('');
const isLoading = ref(false);

// Access the Supabase client and user
const supabase = useSupabaseClient();
const user = useSupabaseUser();

// Function to load profile data
const loadProfile = async () => {
  try {
    isLoading.value = true;

    if (!user.value) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('username, bio, avatar_url')
      .eq('id', user.value.id)
      .single();

    if (error) throw error;

    profileData.value = data;
  } catch (err) {
    errorMessage.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle hook to fetch data
onMounted(() => {
  loadProfile();
});
</script>

<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="errorMessage">
      <p class="error">{{ errorMessage }}</p>
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
