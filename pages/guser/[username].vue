<script setup>
import { ref, onMounted } from 'vue';
import { useSupabaseClient } from '#imports';
import { useRoute } from 'vue-router';
import Inventory from '~/components/Inventory.vue';
import Locator from '~/components/Locator.vue';

// Reactive variables
const route = useRoute();
const username = ref(route.params.username || '');
const profileData = ref(null);
const errorMessage = ref('');
const isLoading = ref(false);

const supabase = useSupabaseClient();

// Function to load profile data
const loadProfile = async () => {
  try {
    isLoading.value = true;

    const { data, error } = await supabase
      .from('profiles')
      .select('username, bio, avatar_url')
      .eq('username', username.value)
      .single();

    if (error) throw error;

    profileData.value = data;
  } catch (err) {
    errorMessage.value = err.message || 'Failed to fetch profile data.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  console.log('Route params:', route.params);
  loadProfile();
});
</script>

<template>
  <Home />
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
    <Inventory />
    <Locator />
    <ResourceDisplay />
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>
