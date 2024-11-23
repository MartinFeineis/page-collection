<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const user = ref(route.params.username)
//const profile = ref(null)
const error = ref(null)
const profurl = `https://media.404founders.com/${user.value}/profile.json`;

// const fetchProfile = async () => {
//   console.log(`Fetching profile from: ${profurl}`);
//   try {
//     const response = await fetch(profurl);
//     console.log('Response:', response);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log('Profile data:', data);
//     profile.value = data;
//   } catch (err) {
//     console.error('Error fetching profile:', err.message);
//     error.value = err.message;
//   }
// };

// const { profile } = await useFetch(profurl)
// // Automatically fetch the profile when `user` changes
// watch(user, fetchProfile, { immediate: true })

// onMounted(fetchProfile)
// console.log(`Fetching profile from: ${profurl}`);
// const response = await fetch(profurl);
// console.log(response);
const profile  = await useFetch(profurl)
</script>

<template>
  <Home />
  <h1>This is the Profile for {{ user }} url {{ profurl }}</h1>
  <div v-if="profile">
    <Profile :prof="profile.data.value.profile" :uname="user" />
    <Jobs :jobs="profile.data.value.jobs" />
    <!-- <TechIcons :username="user" /> -->
  </div>
  <div v-else>
    <p v-if="error">Error fetching profile: {{ error }}</p>
    <p v-else>Loading profile... </p>
  </div>
  <div>
    <p>{{ user }}</p>
  </div>
</template>