<script setup>
import { ref, onMounted } from 'vue';
import { useSupabaseClient, useSupabaseUser } from '#imports';
import { useRoute } from 'vue-router';

// Reactive variables
const route = useRoute();
const username = ref(route.params.username || '');
const profileData = ref(null);
const errorMessage = ref('');
const isLoading = ref(false);

const supabase = useSupabaseClient();
const user = useSupabaseUser();

// Function to load profile data
const loadProfile = async () => {
  try {
    isLoading.value = true;

    if (!user.value) {
      throw new Error('User is not authenticated');
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('username, bio, avatar_url')
      .eq('username', username.value)
      .single();

    if (error) throw error;

    profileData.value = data;
  } catch (err) {
    errorMessage.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  console.log("Route params:", route.params);
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
